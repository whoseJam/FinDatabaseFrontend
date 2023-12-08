<template>
    <div class="ui container">
        <div class="ui vertical masthead segment">
            <h1 class="ui header">股市总览</h1>
            <div class="ui segment">
                <div class="ui four column stackable center aligned grid">
                    <div class="middle aligned row">
                        <div class="column">
                            <button class="ui button" v-show="showBefore" @click="changePage(-1)">上一页</button>
                        </div>
                        <div class="column" @dblclick="tryTurn">
                            <div v-if="showPage">当前所在页：{{ page }}&ensp;&ensp;第&ensp;{{ start }}&ensp;-&ensp;{{ end }}&ensp;条</div>
                            <div v-if="showPage" style="color: gray;">点击以查看详细信息</div>
                            <div v-if="showTurn">
                            <form class="ui form" @submit.native.prevent>
                                <div class="field">
                                    <label>页面号（Enter跳转）</label>
                                    <input id="turn" type="text" name="turn" @keyup.enter="turnPage" style="width: 30%"/>
                                </div>
                            </form>
                            </div>
                        </div>
                        <div class="column">
                            <button class="ui button" v-show="showAfter" @click="changePage(1)">下一页</button>
                        </div>
                        <div class="column">
                            <form class="ui form">
                                <div class="field">
                                    <label>单页条数</label>
                                    <select id="number" name="number" @change="changeItemNum" style="text-align: center;">
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                        <option value="50">50</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        <table class="ui unstackable table">
            <thead>
            <tr>
                <th>名称</th>
                <th>最新价</th>
                <th>最高价</th>
                <th>最低价</th>
                <th>涨跌幅</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list">
                <td>
                    <div class="vertical masthead segment">
                    <div @click="jump2Stock(item.stockId)">{{ item.stockName }}</div>
                    <div @click="jump2Stock(item.stockId)">{{ item.stockId }}</div>
                </div>
                </td>
                <td :style="computeStyle(item.deltaRate)" @click="jump2Stock(item.stockId)">
                    {{ item.newPrice }}
                </td>
                <td :style="computeStyle(item.deltaRate)" @click="jump2Stock(item.stockId)">
                    {{ item.high }}
                </td>
                <td :style="computeStyle(item.deltaRate)" @click="jump2Stock(item.stockId)">
                    {{ item.low }}
                </td>
                <td :style="computeStyle(item.deltaRate)" @click="jump2Stock(item.stockId)">
                    {{ item.deltaRate }}%
                </td>
            </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            page: 1,
            itemNum: 10,
            start: 1,
            end: 10,
            showBefore: false,
            showAfter: true,
            showPage: true,
            showTurn: false,
            list: []
        }
    },
    mounted: function() {
        let self = this;
        this.callData(self.page, self.itemNum);
    },
    methods: {
        callData: function(page, num) {
            let self = this;
            const formData = new FormData();
            formData.append("numInPage", num);
            formData.append("page", page);

            this.$http({
                method: 'post',
                url: '/stock/show',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(function(res) {
                res = res.data;
                self.list = res;
            }).catch(function(err) {
                alert(err);
                self.list = [
                {stockName: "测试例一", stockId: "000001", newPrice: 3.45, high: 3.55, low: 3.2, deltaRate: 10.00},
                {stockName: "测试例二", stockId: "000002", newPrice: 5.75, high: 5.85, low: 5.65, deltaRate: 0.00},
                {stockName: "测试例三", stockId: "000003", newPrice: 4.99, high: 5.00, low: 4.88, deltaRate: -0.20},]
            })
        },
        changePage: function(delta) {
            let self = this;
            this.page = this.page + delta;
            this.showBefore = (this.page > 1);
            this.start = (this.page - 1) * this.itemNum + 1;
            this.end = this.page * this.itemNum;
            this.callData(self.page, self.itemNum);
            this.showTurn = false;
            this.showPage = true;
        },
        changeItemNum: function() {
            let value = document.getElementById("number").value;
            this.itemNum = value;
            this.changePage(1 - this.page);
        },
        computeStyle: function(delta) {
            let eps = 1e-4;
            if (Math.abs(delta) <= eps) return "color: black";
            else if (delta > 0) return "color: red";
            return "color: green";
        },
        jump2Stock: function(id) {
            this.$router.push({
                path: "/stock/" + id
            });
        },
        tryTurn: function() {
            if (this.showPage) {
                this.showPage = false;
                this.showTurn = true;
            }
        },
        turnPage: function() {
            if (this.showTurn) {
                let value = document.getElementById("turn").value;
                if (value != null) {
                    this.showTurn = false;
                    this.showPage = true;
                    this.changePage(value - this.page);
                }
            }
        }
    }
}
</script>
