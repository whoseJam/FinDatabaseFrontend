<template>
    <div class="ui container" v-if="isAdmin">
        <div class="ui vertical masthead segment">
            <div class="ui vertical basic buttons" style="float: left; width: 15%">
                <button :class="classList[0]" @click="menuClick(0)">用户信息管理</button>
                <button :class="classList[1]" @click="menuClick(1)">用户资金管理</button>
                <button :class="classList[2]" @click="menuClick(2)">查询上线记录</button>
                <button :class="classList[3]" @click="menuClick(3)">查询交易记录</button>
            </div>
            <div class="ui segment" v-if="(nowActive == 0 && isAdmin)" style="float: left; width: 80%; left: 5%">
                <div class="ui segment">
                <div class="ui four column stackable center aligned grid">
                    <div class="middle aligned row">
                        <div class="column">
                            <button class="ui button" v-show="showBefore" @click="changePage(-1)">上一页</button>
                        </div>
                        <div class="column" @dblclick="tryTurn">
                            <div v-if="showPage">当前所在页：{{ page }}&ensp;&ensp;第&ensp;{{ start }}&ensp;-&ensp;{{ end }}&ensp;条</div>
                            <div v-if="showPage" style="color: gray;">点击以查看详细信息</div>
                            <div v-if="showPage" style="color: gray;">双击此处可自由跳页</div>
                            <div v-if="showTurn">
                            <form class="ui form" @submit.native.prevent>
                                <div class="field">
                                    <label>页面号（Enter跳转）</label>
                                    <input id="turn" type="text" name="turn" @keyup.enter="turnPage" style="width: 40%" />
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
                                        <option value="5" selected>5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
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
                    <th>用户ID</th>
                    <th>用户名</th>
                    <th>用户头像</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in showList">
                <td v-if="item != undefined">{{ item.id }}</td>
                <td v-if="item != undefined" style="width:30%">{{ item.name }}</td>
                <td v-if="item != undefined"><a @click="showHead(item.photoUrl)">点击查看头像</a></td>
                <td v-if="item != undefined">
                    <button class="ui button" @click="callDeleteHead(item.name, item.id)">删除用户头像</button>
                    <button class="ui negative button" @click="callDeleteUser(item.name, item.id)">删除用户</button>
                </td>
                </tr>
                </tbody>
                </table>
            </div>
            <div class="ui segment" v-if="(nowActive == 1 && isAdmin)" style="float: left; width: 80%; left: 5%">
                <div class="ui segment">
                <div class="ui four column stackable center aligned grid">
                    <div class="middle aligned row">
                        <div class="column">
                            <button class="ui button" v-show="showBefore" @click="changePage(-1)">上一页</button>
                        </div>
                        <div class="column" @dblclick="tryTurn">
                            <div v-if="showPage">当前所在页：{{ page }}&ensp;&ensp;第&ensp;{{ start }}&ensp;-&ensp;{{ end }}&ensp;条</div>
                            <div v-if="showPage" style="color: gray;">点击以查看详细信息</div>
                            <div v-if="showPage" style="color: gray;">双击此处可自由跳页</div>
                            <div v-if="showTurn">
                            <form class="ui form" @submit.native.prevent>
                                <div class="field">
                                    <label>页面号（Enter跳转）</label>
                                    <input id="turn" type="text" name="turn" @keyup.enter="turnPage" style="width: 40%" />
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
                                        <option value="5" selected>5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
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
                    <th>用户ID</th>
                    <th>用户名</th>
                    <th>当前总资产</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in showList">
                <td v-if="item != undefined">{{ item.id }}</td>
                <td v-if="item != undefined" style="width:30%">{{ item.name }}</td>
                <td v-if="item != undefined" style="width:15%">{{ item.balance }}</td>
                <td v-if="item != undefined">
                    <button class="ui positive button" @click="showBalanceSet(3, item.name, item.id)">增加用户资金</button>
                    <button class="ui negative button" @click="showBalanceSet(4, item.name, item.id)">扣除用户资金</button>
                </td>
                </tr>
                </tbody>
                </table>
            </div>
            <div class="ui segment" v-if="(nowActive == 2 && isAdmin)" style="float: left; width: 80%; left: 5%">
                <h2 class="ui header">查询上线记录</h2><br>
                <p>暂时没写：不知道查询上线记录有没有意义、实现是否方便</p>
            </div>
            <div class="ui segment" v-if="(nowActive == 3 && isAdmin)" style="float: left; width: 80%; left: 5%">
                <div class="ui segment">
                <div class="ui four column stackable center aligned grid">
                    <div class="middle aligned row">
                        <div class="column">
                            <button class="ui button" v-show="showBefore" @click="changePage(-1)">上一页</button>
                        </div>
                        <div class="column" @dblclick="tryTurn">
                            <div v-if="showPage">当前所在页：{{ page }}&ensp;&ensp;第&ensp;{{ start }}&ensp;-&ensp;{{ end }}&ensp;条</div>
                            <div v-if="showPage" style="color: gray;">点击以查看详细信息</div>
                            <div v-if="showPage" style="color: gray;">双击此处可自由跳页</div>
                            <div v-if="showTurn">
                            <form class="ui form" @submit.native.prevent>
                                <div class="field">
                                    <label>页面号（Enter跳转）</label>
                                    <input id="turn" type="text" name="turn" @keyup.enter="turnPage" style="width: 40%" />
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
                                        <option value="5" selected>5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
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
                    <th>委托ID</th>
                    <th>发起时间</th>
                    <th>发起人ID</th>
                    <th>委托类型</th>
                    <th>委托股票</th>
                    <th>价格及股数</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in showList">
                <td v-if="item != undefined">{{ item.id }}</td>
                <td v-if="item != undefined">{{ getDateString(item.timeSimulate) }}</td>
                <td v-if="item != undefined">{{ item.userid }}</td>
                <td v-if="item != undefined">
                    <div class="vertical masthead segment">
                        <div>{{ item.action }}</div>
                        <div>{{ item.type }}</div>
                    </div>
                </td>
                <td v-if="item != undefined">{{ item.stock }}</td>
                <td v-if="item != undefined">
                    <div class="vertical masthead segment">
                        <div>{{ item.price }}</div>
                        <div>{{ item.size }}</div>
                    </div>
                </td>
                <td v-if="item != undefined">
                    <button v-if="!item.finish" class="ui negative button" @click="callDeleteSimulate(item.id)">删除委托</button>
                </td>
                </tr>
                </tbody>
                </table>
            </div>
        </div>
    </div>

    <el-dialog title="发生错误" v-model="isError" width="30%" height="50%">
    <div style="text-align: center;">
        {{ errInfo }}
    </div>
    </el-dialog>

    <el-dialog title="查看头像" v-model="isPhoto" width="50%" height="50%">
    <div style="text-align: center;">
        <img :src="photo" style="width: 50%;">
    </div>
    </el-dialog>

    <el-dialog title="确认操作" v-model="isConfirm" width="50%" height="50%">
    <div style="text-align: center;">
        <p>{{ confirmMsg }}</p>
        <p><b>这一操作是不可逆的！</b></p>
        <div>
            <button class="ui negative button" @click="confirm">确定</button>
            <button class="ui button" @click="stop">取消</button>
        </div>
    </div>
    </el-dialog>

    <el-dialog title="资金管理" v-model="isSetBalance" width="50%" height="50%">
    <div style="text-align: center;">
        <p>为用户&ensp;&ensp;{{ callName }}&ensp;(ID:&ensp;{{ callId }})&ensp;&ensp;{{ BalanceAction }}资金</p>
        <div>
            <form class="ui form" style="width: 80%; margin: auto;">
            <div class="field">
                <label>请输入为该用户{{ BalanceAction }}的金额：</label>
                <input id="delta" type="number" name="delta" :placeholder="BalanceAction" style="width:40%"/>
            </div>
            </form><br>
            <button class="ui negative button" @click="confirm">确定</button>
        </div>
    </div>
    </el-dialog>
</template>

<script>

export default {
    data: function () {
        let isAdmin = (window.sessionStorage.getItem("isAdmin") == "true");
        return {
            isAdmin: isAdmin,
            isError: false,
            isPhoto: false,
            isConfirm: false,
            errInfo: "",
            nowActive: 0,
            classList: ["ui active button", "ui button", "ui button", "ui button"],
            infoList: [],
            showList: [],
            photo: "",
            confirmMsg: "",
            actionFlag: -1,
            isSetBalance: false,
            callName: "",
            callId: "",
            BalanceAction: "",
            page: 1,
            itemNum: 5,
            start: 1,
            end: 5,
            showBefore: false,
            showAfter: true,
            showPage: true,
            showTurn: false,
        }
    },
    mounted: function() {
        let self = this;
        if (!this.isAdmin) {
            this.showError("您不是管理员，无权操作！将跳转回主页...")
            setTimeout(function() {
                self.$router.push({path: '/'});
            }, 2000);
            return;
        }
        this.showError("接口还没写：本页所有内容均为样例数据...");
        this.nowActive = this.$route.params.type;
        for (var i = 0; i < 4; i++) {
            if (i == this.nowActive) {
                this.classList[i] = "ui active button";
            } else {
                this.classList[i] = "ui button";
            }
        }
        this.getInfo(this.nowActive);
    },
    methods: {
        menuClick: function(num) {
            if (this.nowActive != num) {
                this.nowActive = num;
                for (var i = 0; i < 4; i++) {
                    if (i == this.nowActive) {
                        this.classList[i] = "ui active button";
                    } else {
                        this.classList[i] = "ui button";
                    }
                }
                this.getInfo(num);
            }
        },
        getInfo: function(num) {
            //  等待接口完成，此处为测试用例
            if (num == 0) {
                this.infoList = [
                    {id: "1", name: "42号混凝土", photoUrl: "src/test.png"},
                    {id: "2", name: "Furina", photoUrl: "src/test.png"},
                    {id: "3", name: "救命，手机在自动下载元梦之星", photoUrl: "src/test.png"},
                    {id: "4", name: "数据库有点太城市化了", photoUrl: "src/test.png"},
                    {id: "5", name: "1145141919810", photoUrl: "src/test.png"},
                    {id: "6", name: "花开富贵", photoUrl: "src/test.png"},
                ]
            } else if (num == 1) {
                this.infoList = [
                    {id: "1", name: "42号混凝土", balance: 1145.14},
                    {id: "2", name: "Furina", balance: 19198.10},
                    {id: "3", name: "救命，手机在自动下载元梦之星", balance: 123456.78},
                    {id: "4", name: "数据库有点太城市化了", balance: 0.12},
                    {id: "5", name: "1145141919810", balance: 65472.00},
                    {id: "6", name: "花开富贵", balance: 100000.00},
                ]
            } else if (num == 3) {
                this.infoList = [
                    {id: "3", timeSimulate: "1703140040000", userid: "2", action: "委托买入", type: "市价委托", stock: "000001", price: "11.45", size: "1400", finish: false},
                    {id: "2", timeSimulate: "1703137313000", userid: "3", action: "委托卖出", type: "限价委托", stock: "000002", price: "19.19", size: "8100", finish: false},
                    {id: "1", timeSimulate: "1702782960000", userid: "4", action: "委托买入", type: "市价委托", stock: "000003", price: "2.34", size: "56700", finish: true},
                ]
            }
            this.callData(1);
        },
        getDateString: function(value) {
            console.log(value);
            let date = new Date(Number(value));
            console.log(date);
            return ("" + date.getFullYear() + "年" + date.getMonth() + "月" + date.getDate() + "日"
                    + date.getHours() + ":" + date.getMinutes());
        },
        showError: function(word) {
            this.isError = true;
            this.errInfo = word;
        },
        showHead: function(url) {
            this.photo = url;
            this.isPhoto = true;
        },
        showConfirm: function(word, num) {
            this.actionFlag = num;
            this.confirmMsg = word;
            this.isConfirm = true;
        },
        showBalanceSet: function(type, name, id) {
            this.isSetBalance = true;
            this.callName = name;
            this.callId = id;
            this.actionFlag = type;
            if (type == 3) {
                this.BalanceAction = "增加";
            } else {
                this.BalanceAction = "扣除";
            }
        },
        confirm: function() {
            this.isConfirm = false;
            this.isSetBalance = false;
            if (this.actionFlag == 1) {
                alert("接口还没写：删除头像");
            } else if (this.actionFlag == 2) {
                alert("接口还没写：删除用户");
            } else if (this.actionFlag == 3) {
                alert("接口还没写：增加用户资金");
            } else if (this.actionFlag == 4) {
                alert("接口还没写：扣除用户资金");
            } else if (this.actionFlag == 5) {
                alert("接口还没写：删除委托")
            }
        },
        stop: function() {
            this.isConfirm = false;
            this.actionFlag = -1;
        },
        callDeleteHead: function(username, userid) {
            this.showConfirm("您确定要移除用户 " + username + " (ID: " + userid + ") 的头像，恢复为默认头像吗？", 1);
        },
        callDeleteUser: function(username, userid) {
            this.showConfirm("您确定要移除用户 " + username + " (ID: " + userid + ") 吗？", 2);
        },
        callDeleteSimulate: function(id) {
            this.showConfirm("您确定要移除ID为 " + id + " 的委托吗？", 5);
        },
        callData: function(page) {
            this.page = page;
            this.showTurn = false;
            this.showPage = true;
            this.showBefore = (this.page > 1);
            this.showAfter = (this.page * this.itemNum < this.infoList.length);
            this.start = (page - 1) * this.itemNum + 1;
            this.end = (page * this.itemNum < this.infoList.length)? page * this.itemNum : this.infoList.length;
            console.log(this.start);
            for (var i = 0; (i < this.itemNum && this.start + i <= this.infoList.length)
                    || this.showList[i] != null; i++) {
                if (i < this.itemNum && this.start + i <= this.infoList.length) {
                    this.showList[i] = this.infoList[this.start + i - 1];
                } else {
                    this.showList[i] = undefined;
                }
            }
            console.log(this.showList[0].id);
        },
        changePage: function(num) {
            let self = this;
            this.callData(self.page + num);
        },
        changeItemNum: function() {
            let value = document.getElementById("number").value;
            this.itemNum = value;
            this.callData(1);
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
                    if (value * this.itemNum > this.infoList.length) {
                        this.callData(Math.trunc((this.infoList.length - 1) / this.itemNum) + 1);
                    } else {
                        this.callData(value);
                    }
                }
            }
        },
    }
}
</script>
