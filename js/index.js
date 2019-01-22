var Web3 = require('web3');
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider player U want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.2.37:8545"));
}
const LogBloom = "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"

var contractAddress;
var abiArray = [
    {
        "constant":true,
        "inputs":[

        ],
        "name":"banker",
        "outputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"IP",
                "type":"uint256"
            },
            {
                "name":"IQ",
                "type":"uint256"
            }
        ],
        "name":"Upload",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[

        ],
        "name":"checkIn",
        "outputs":[

        ],
        "payable":true,
        "stateMutability":"payable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"rd",
        "outputs":[
            {
                "name":"playerIndexToRun",
                "type":"uint256"
            },
            {
                "name":"uploadKeyNum",
                "type":"uint256"
            },
            {
                "name":"N",
                "type":"uint256"
            },
            {
                "name":"P",
                "type":"uint256"
            },
            {
                "name":"Q",
                "type":"uint256"
            },
            {
                "name":"analyse",
                "type":"bool"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[

        ],
        "name":"bidHogs",
        "outputs":[
            {
                "name":"",
                "type":"bool"
            }
        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"cards",
                "type":"uint256[]"
            }
        ],
        "name":"encryptCard",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"flag",
        "outputs":[
            {
                "name":"",
                "type":"uint8"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"order",
                "type":"uint256[]"
            },
            {
                "name":"keys",
                "type":"uint256[]"
            }
        ],
        "name":"uploadKey",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[

        ],
        "name":"construct",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"cards",
                "type":"uint256[]"
            }
        ],
        "name":"shuffleCard",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[
            {
                "name":"m",
                "type":"uint256"
            },
            {
                "name":"a",
                "type":"uint256"
            },
            {
                "name":"n",
                "type":"uint256"
            }
        ],
        "name":"encryptAndDecrypt",
        "outputs":[
            {
                "name":"M",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"pure",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"wins",
                "type":"bool[]"
            }
        ],
        "name":"uploadResult",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"highestBid",
        "outputs":[
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[
            {
                "name":"keys",
                "type":"uint256[]"
            },
            {
                "name":"order",
                "type":"uint8[]"
            },
            {
                "name":"flagb",
                "type":"uint8"
            }
        ],
        "name":"playCard",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[

        ],
        "name":"analyseResult",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"pure",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[
            {
                "name":"",
                "type":"uint256"
            }
        ],
        "name":"players",
        "outputs":[
            {
                "name":"",
                "type":"address"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"players",
                "type":"address[]"
            }
        ],
        "name":"Start",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"P",
                "type":"uint256"
            },
            {
                "indexed":false,
                "name":"Q",
                "type":"uint256"
            }
        ],
        "name":"PrimePut",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"player",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"flag",
                "type":"uint256"
            }
        ],
        "name":"ToShuffle",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"player",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"cipCards",
                "type":"uint256[]"
            }
        ],
        "name":"Shuffle",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"",
                "type":"string"
            }
        ],
        "name":"ToEncryptCard",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"player",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"cards",
                "type":"uint256[]"
            }
        ],
        "name":"Encrypt",
        "type":"event"
    },
	{
        "constant":true,
        "inputs":[

        ],
        "name":"getPlayers",
        "outputs":[
            {
                "name":"",
                "type":"address[]"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "anonymous":false,
        "inputs":[

        ],
        "name":"ToUploadKey",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"player",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"keys",
                "type":"uint256[]"
            }
        ],
        "name":"uploadkey",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"",
                "type":"address"
            }
        ],
        "name":"reuploadkey",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[

        ],
        "name":"ToPlayCard",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"",
                "type":"uint256"
            },
            {
                "indexed":false,
                "name":"",
                "type":"uint256"
            }
        ],
        "name":"playcard",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"player",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"keys",
                "type":"uint256[]"
            },
            {
                "indexed":false,
                "name":"order",
                "type":"uint8[]"
            },
            {
                "indexed":false,
                "name":"flag",
                "type":"uint8"
            }
        ],
        "name":"Discard",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"",
                "type":"string"
            }
        ],
        "name":"MoveOutRoom",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"player",
                "type":"address"
            },
            {
                "indexed":false,
                "name":"money",
                "type":"uint256"
            },
            {
                "indexed":false,
                "name":"playerNum",
                "type":"uint8"
            }
        ],
        "name":"CheckInRoom",
        "type":"event"
    },
    {
        "anonymous":false,
        "inputs":[
            {
                "indexed":false,
                "name":"",
                "type":"bool[]"
            }
        ],
        "name":"broadMoney",
        "type":"event"
    }
];
var niuniuContract = web3.eth.contract(abiArray);
var niuniu;

//显示账户信息
function showAccounts() {
    var accounts = web3.eth.accounts;
    $("option").text(accounts[0]);
    for (var i = 1; i < accounts.length; i++) {
        $("select").append('<option value="' + i + '">' + accounts[i] + '</option>')
    }
}

function getBinary(a) {
    var words = new Array();
    while (a != 0) {
        words.push(a % 2);
        a >>= 1;
    }
    return words;
}
//加解密算法
function expMod(m, a, N) {
    var at = m;
    var bs = getBinary(a);
    var sz = bs.length;
    if (bs[0] == 1) {
        M = m % N;
    } else {
        M = 1;
    }
    for (var i = 1; i < sz; i++) {
        at = at % N;
        at = at * at;
        at = at % N;
        if (bs[i] != 0) {
            M = M * at % N;
        }
    }
    return M;
}
//自动生成q,p,以及加密秘钥，解密秘钥
function generateKey() {
    var q = getPrime();
    var p = getPrime();
    while (q == p) {
        p = getPrime();
    }
    var phi = (q - 1) * (p - 1);
    var e = 0;
    while (true) {
        e = getRandom();
        if (gcd(phi, e) == 1) {
            break;
        }
    }
    var d = getD(e, phi);
    return {
        "q": q,
        "p": p,
        "e": e,
        "d": d
    };
}
//根据q,p,生成加密秘钥，解密秘钥
function getEDFromQP(q, p) {
    var phi = (q - 1) * (p - 1);
    var e = 0;
    while (true) {
        e = getRandom();
        if (gcd(phi, e) == 1) {
            break;
        }
    }
    var d = getD(e, phi);
    return {
        "e": e,
        "d": d
    };
}

function getD(e, N) {
    var r = 0;
    for (var d = 1; d <= N; d++) {
        r = (d * e) % N;
        if (r == 1) {
            return d;
        }
    }
}

//求最大公约数
function gcd(a, b) {
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
}

function getRandom() {
    return Math.floor(Math.random() * 100 + 21);
}
//获取质数
function getPrime() {
    var num = 0;
    while (true) {
        num = getRandom();
        if (prime(num)&&num) {
            break;
        }
    }
    return num;
}
//判断质数
function prime(num) { //函数判断某一个数是否为质数
    var i;
    while (num >= 2) {
        for (i = 2; i <= Math.sqrt(num); i++) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }
}



function getCardFromNum(num){
	var c = (num - 2) % 4 + 1;
	var n = Math.floor((num - 2) / 4) + 1;
	var v = n ;
	if(v > 9){
		v = 0;
	}
	return n.toString(16)+ v + c;
}

function getNumFromCard(card){
	card = card +"";
	var n = parseInt(String.fromCharCode(card.charCodeAt(0)),16);
	var c = parseInt(String.fromCharCode(card.charCodeAt(2)),10);
	return (n - 1) * 4 + c + 1;
}

function onSelect(e) {
    var s = $(e).attr("class");
	if (s != "onclick") {
        $(e).attr("class", "onclick");
    } else {
        $(e).attr("class", "");
    }
    //alert(encrypt("12","1234567812345678"))
}
//数组顺序打乱
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function compareCards(cards1,flag1,cards2,flag2){
	if(cardIsVaild(cards1,flag1)&&cardIsVaild(cards2,flag2)){
		if(flag1!=flag2){
			return flag1>flag2;
		}else{
			if(flag1==1){
				var total1 =0;
				var total2 =0;
				for(var i = 2;i<5;i++){
					total1 = total1 + parseInt(getCardFromNum(cards1[i]).substring(1, 2));
					total2 = total2 + parseInt(getCardFromNum(cards2[i]).substring(1, 2))
				}
				total1 = total1 % 10;
				total2 = total2 % 10;
				if(total1!=total2){
					if(total1==0){
						return true;
					}else if(total2==0){
						return false;
					}else{
						return total1>total2;
					}
				}else{
					return compareBigOne(cards1,cards2);
				}
			}else{
				return compareBigOne(cards1,cards2);
			}
		}
	}
}

function compareBigOne(cards1,cards2){
	var big1 = 0;
	var big2 = 0;
	var temp = 0;
	for(var i = 0;i<5;i++){
		temp = parseInt(getCardFromNum(cards1[i]));
		big1 = big1>temp?big1:temp;
		temp = parseInt(getCardFromNum(cards2[i]));
		big2 = big2>temp?big2:temp;
	}
	return big1>big2;
}

function cardIsVaild(cards,flag){
	if(cards.length!=5){
		return false;
	}
	var total = 0;
	var num = 0;
	if(flag==3){
		for(var i = 0;i<5;i++){
			num = getCardFromNum(cards[i]).substring(0, 1);
			total = total + parseInt(num)
		}
		if(total==10){
			return true;
		}else{
			return false;
		}
	}else if(flag==2){
		for(var i = 0;i<5;i++){
			num = getCardFromNum(cards[i]).substring(1, 2);
			total = total + parseInt(num)
		}
		if(total==0){
			return true;
		}else{
			return false;
		}
	}else if(flag==1){
		for(var i = 0;i<3;i++){
			num = getCardFromNum(cards[i]).substring(1, 2);
			total = total + parseInt(num);
		}
		if(total%10==0){
			return true;
		}else{
			return false;
		}
		
	}else if(flag==0){
		return true;
	}else{
		return false;
	}
}

var nums; //牌数据
var all_players; //参与的玩家
var state = 0;
var banker; //庄家
var player; //玩家地址
var P;
var Q;
var firstRound;
var secondRound;
var keysMap = new Map();
var otherKeysMap = new Map();
var myCardsArray;
var otherCardsArray;
var myFlag;
var myOrders;
//洗牌
function shuffle() {
    $("#state").text("洗牌中...");
    if (all_players[0] == player) {
        nums = [2];
        for (var k = 3; k < 54; k++) {
            nums.push(k);
        }
    }
    console.log("banker:" + banker + ",player:" + player);
	$("#pq").text("q:" + Q + ",p:" + P);
    var s = getEDFromQP(Q, P);
    firstRound = s;
    $("#oneKey").text(JSON.stringify(s));
    var array = nums;
    var result = new Array(array.length);
	shuffleArray(array);
	var len = array.length
    for (var i = 0; i < len; i++) {
        result[i] = expMod(array[i], s.e, Q * P)
    }
    nums = result;
    var shuffleHash = niuniu.shuffleCard.sendTransaction(nums, {
        from: player,
        gas: 3000000
    });
    console.log("shuffleHash:" + shuffleHash);
    console.log(result);
}
//第二轮加密牌
function encryptKey() {
    $("#state").text("加密中...");
    var array = nums;
    var keys = new Array();
    var len = array.length
    var result = new Array(array.length);
	var key = ""
    var s = undefined;
    for (var i = 0; i < len; i++) {
        temp = expMod(array[i], firstRound.d, Q * P);
        s = getEDFromQP(Q, P);
        keys.push(s);
        result[i] = expMod(temp, s.e, Q * P);
    }
    secondRound = keys;
    $("#twoKeys").text(JSON.stringify(keys));
    niuniu.encryptCard.sendTransaction(result, {
        from: player,
        gas: 3000000
    });
    console.log(result)
}
//五小牛
function wxn() {
    var total = 0;
	var cardsArray=[];
	var value;
	var mykeys=[];
	var k=0;
	$("[id='my']").each(function() {
		value = $(this).attr("value")
        num = getCardFromNum(value).substring(0, 1);
		total = total + parseInt(num)
    });
	if(player==all_players[0]){
		k=0
	}else{
		k=5;
	}
	for(var i = 0;i < 5;i++){
		mykeys.push(secondRound[i+k].d);
		cardsArray.push(i+k);
	}
    if (10 == total) {
		var hash = niuniu.playCard.sendTransaction(mykeys,cardsArray,3,{from:player,gas:3000000});
		myFlag = 3;
		myOrders = cardsArray;
		var data = niuniu.playCard.getData(mykeys,cardsArray,3,{from:player,gas:3000000});
        $("#state").text("五小牛出牌中...");
		console.log(hash);
		console.log(data);
    } else {
        alert("亲，没有五小牛，请重新选择！")
    }
}
//五花牛
function whn() {
    var total = 0;
	var cardsArray=[];
	var value;
	var mykeys=[];
	var k=0;
	$("[id='my']").each(function() {
		value = $(this).attr("value")
        num = getCardFromNum(value).substring(1, 2);
		total = total + parseInt(num)
    });
	if(player==all_players[0]){
		k=0
	}else{
		k=5;
	}
	for(var i = 0;i < 5;i++){
		mykeys.push(secondRound[i+k].d);
		cardsArray.push(i+k);
	}
    if (0 == total) {
        var hash = niuniu.playCard.sendTransaction(mykeys,cardsArray,2,{from:player,gas:3000000});
		myFlag = 2;
		myOrders = cardsArray;
		var data = niuniu.playCard.getData(mykeys,cardsArray,2,{from:player,gas:3000000});
        $("#state").text("五花牛出牌中...");
		console.log(hash);
		console.log(data);
    } else {
        alert("亲，没有五花牛，请重新选择哦！")
    }
}
//炸弹
function boom() {
    var cards = new Map();
	var temp = "";
	var cardsArray;
	var value;
	var mykeys;
	var k=0;
	$("[id='my']").each(function(i) {
        temp = getCardFromNum($(this).attr("value"));
		var val = cards.get(temp);
		if (null == val) {
            cards.set(temp, 1)
        } else {
            cards.set(temp, val + 1)
        }
    });
    var flag = false
    if (cards.size < 3) {
        cards.forEach(function(k, v) {
            if (v > 3) {
                flag = true
            }
        });
    }
	if(player==all_players[0]){
		k=0
	}else{
		k=5;
	}
	for(var i = 0;i < 5;i++){
		mykeys.push(secondRound[i+k].d);
	}
    if (flag) {
        //niuniu.playCard.sendTransaction(mykeys,cardsArray,2,{from:player,gas:300000});
    } else {
        alert("亲，没有炸弹，请重新选择哦！")
    }
}
//有牛
function niu() {
    var total = 0
    var num = 0;
	var cardsArray=[];
	var value;
	var mykeys=[];
	var k=0;
	if(player==all_players[0]){
		k=0
	}else{
		k=5;
	}
	for(var i = 0;i < 5;i++){
		mykeys.push(secondRound[i+k].d);
	}
	$(".onclick").each(function(i) {
		value = $(this).attr("value");
        num = getCardFromNum(value).substring(1, 2);
		total = total + parseInt(num);
		num = i + 1;
    });
	var m=0;
	$("[id='my']").each(function(i) {		
		if($(this).attr("class")=="onclick"){
			value = $(this).attr("value");
			cardsArray.push(m+k);
		}
		m++;		
	});
	m=0;
	$("[id='my']").each(function(i) {		
		if($(this).attr("class")!="onclick"){
			value = $(this).attr("value");
			cardsArray.push(m+k);
		}
		m++;
	});
	s = total % 10;
    if (num != 3) {
        alert("请选3张牌");
    } else if (s != 0) {
        alert("选中牌无牛");
    } else {
		$("#state").text("出牌中...");
        var hash = niuniu.playCard.sendTransaction(mykeys,cardsArray,1,{from:player,gas:3000000});
		myFlag = 1;
		myOrders = cardsArray;
		var data = niuniu.playCard.getData(mykeys,cardsArray,1,{from:player,gas:3000000});
		console.log(hash);
		console.log(data);
    }
}
//没牛
function mn() {
	var cardsArray=[];
	var value;
	var mykeys=[];
	var k=0;
	$("[id='my']").each(function() {
		value = $(this).attr("value")
    });
	if(player==all_players[0]){
		k=0
	}else{
		k=5;
	}
	for(var i = 0;i < 5;i++){
		mykeys.push(secondRound[i+k].d);
		cardsArray.push(i+k);
	}
	$("#state").text("出牌中...");
	var hash = niuniu.playCard.sendTransaction(mykeys,cardsArray,0,{from:player,gas:3000000});
	myFlag = 0;
	myOrders = cardsArray;
	var data = niuniu.playCard.getData(mykeys,cardsArray,0,{from:player,gas:3000000});
	console.log(hash);
	console.log(data);
}
//退出
function exit() {

}
function setPQ() {
    if (player == banker) {
        $("#state").text("选择Q,P中...");
        P = getPrime();
        Q = getPrime();
        niuniu.Upload.sendTransaction(P, Q, {
            from: player
        });
    }

}

//加入房间
function checkIn() {
    contractAddress = $("#contract").val();
    niuniu = niuniuContract.at(contractAddress);
    $("#state").text("进入房间中，请等待...");
    alert("您将支付100000000000wei作为赌注");
    player = web3.eth.accounts[$("#account").val()];
    niuniu.checkIn({
        from: player,
        value: 100000000000,
        gas: 3000000
    },
    function(error, result) {
        if (!error) {
            console.log("加入房间hash值:" + result);
            var time = 0;
            var flag = setInterval(function() {
                var receipt = web3.eth.getTransactionReceipt(result);
                if (receipt) {
                    if (LogBloom == receipt.logsBloom) {
                        alert("加入房间失败");
                        clearInterval(flag);
                    } else {
                        alert("加入房间成功");
                        clearInterval(flag);
                    }
                } else if (time > 60) {
                    alert("加入房间超时");
                    clearInterval(flag);
                }
                time++;
            },
            1000);
        } else {
            alert(error)
        }
    });
    watch();
}

function bidHogs() {
    $("#state").text("抢庄中...");
    niuniu.bidHogs.sendTransaction({
        from: player,
        gas: 3000000
    },
    function(error, result) {
        if (error) {
            alert("数据发送失败");
        } else {
            console.log("抢庄：" + result)
        }
    });
}
function uploadKey() {
    var len = secondRound.length;
    var array = new Array();
	var orderArray = new Array();
    $("#state").text("收集秘钥中...");
    var k;
    var m;
    //将自己拥有的其他人的牌的秘钥交出
    if (player == all_players[0]) {
        k = 5;
        m = 0;
    } else {
        k = 0;
        m = 5;
    }
    var myarray = new Array();
    for (var i = 0; i < 5; i++) {
        array.push(secondRound[k + i].d);
		orderArray.push(k + i);
    }
    for (var i = 0; i < 5; i++) {
        myarray.push(secondRound[m + i].d);
    }
	otherKeysMap.set(player,array);
    keysMap.set(player, myarray);
    var hash = niuniu.uploadKey.sendTransaction(orderArray,array, {
        from: player,
        gas: 3000000
    });
    console.log("上传秘钥hash:" + hash);
}


















//监控事件
function watch() {
    watchCheckIn();
    watchStart();
    watchToShuffle();
    watchPrimePut();
    watchShuffle();
    watchToEncryptCard();
    watchEncrypt();
    watchToUploadKey();
    watchuploadkey();
    watchToPlayCard();
    watchDiscard();
	watchbroadMoney();
}
function watchCheckIn() {
    var CheckIn = niuniu.CheckInRoom({},
    {
        fromBlock: 'latest',
        toBlock: 'latest'
    })

    // watch for changes
    CheckIn.watch(function(error, result) {
        if (!error) {
            console.log(result);
            if (state == 0) {
                if (player == result.args.player) {
                    $("#state").text("已进入房间，请等待其他玩家...");
                } else {
                    alert("玩家" + result.args.player + "进入房间");
                }

            }
        }

    });
}
function watchStart() {
    var start = niuniu.Start({},
    {
        fromBlock: 'latest',
        toBlock: 'latest'
    })

    // watch for changes
    start.watch(function(error, result) {
        if (!error) {
            console.log(result);
            all_players = result.args.players;
            state = 2;
            $("#state").text("开始游戏，请抢庄");
        }

    });
}
function watchPrimePut() {
    var primePut = niuniu.PrimePut({},
    {
        fromBlock: 'latest',
        toBlock: 'latest'
    })

    // watch for changes
    primePut.watch(function(error, result) {
        if (!error) {
            console.log(result);
            P = result.args.P;
            Q = result.args.Q;
            $("#pq").text(result.args.P + "," + result.args.Q);
            if (player == all_players[0]) {
                $("#state").text("请洗牌!");
                $("#player_A").html("<a>player A: </a><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/>  <img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/> ");
                $("#player_U").html("<a>player U: </a> <img src='images/shuffle2.gif' /> ");
            } else {
                $("#state").text("等待他人洗牌...");
                $("#player_U").html("<a>player U: </a><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/>  <img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/> ");
                $("#player_A").html("<a>player A: </a> <img src='images/shuffle2.gif' /> ");
            }
        } else {
            alert(error);
        }

    });
}
function watchToShuffle() {
    var toShuffle = niuniu.ToShuffle({},
    {
        fromBlock: 'latest',
        toBlock: 'latest'
    })

    // watch for changes
    toShuffle.watch(function(error, result) {
        if (!error) {
            console.log(result);
            banker = niuniu.banker.call();
            $("#banker").text(banker);
            $("#order").text(JSON.stringify(all_players));
            if (banker == player) {
                $("#state").text("请选择P，Q!");
            } else {
                $("#state").text("等待庄家选择P，Q...");
            }
        } else {
            alert(error);
        }

    });
}
function watchShuffle() {
    var shuffle = niuniu.Shuffle({},
    {
        fromBlock: 'latest',
        toBlock: 'latest'
    })

    // watch for changes
    shuffle.watch(function(error, result) {
        if (!error) {
            console.log(result);
            nums = result.args.cipCards; //记录洗牌后的牌数据
            $("#message").append(JSON.stringify(nums) + "</br>");
            if (state != 4) {
                for (var i = 0; i < all_players.length; i++) {
                    if (all_players[i] == result.args.player) {
                        if (i + 1 < all_players.length && all_players[i + 1] == player) {
                            $("#state").text("请洗牌!");
                            $("#player_A").html("<a>player A: </a><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/>  <img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/> ");
                            $("#player_U").html("<a>player U: </a> <img src='images/shuffle2.gif' /> ");
                        } else {
                            $("#state").text("等待他人洗牌...");
                            $("#player_U").html("<a>player U: </a><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/>  <img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/> ");
                            $("#player_A").html("<a>player A: </a> <img src='images/shuffle2.gif' /> ");
                        }
                        break;
                    }
                }

            }
        }
    });
}

function watchToEncryptCard() {
    var toEncryptCard = niuniu.ToEncryptCard({},
    {
        fromBlock: 'latest',
        toBlock: 'latest'
    })

    // watch for changes
    toEncryptCard.watch(function(error, result) {
        if (!error) {
            state = 4;
            console.log(result);
            if (all_players[0] == player) {
                $("#state").text("请加密牌!");
                $("#player_A").html("<a>player A: </a><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/>  <img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/> ");
                $("#player_U").html("<a>player U: </a> <img src='images/shuffle2.gif' /> ");
            } else {
                $("#state").text("等待他人加密牌...");
                $("#player_U").html("<a>player U: </a><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/>  <img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/> ");
                $("#player_A").html("<a>player A: </a> <img src='images/shuffle2.gif' /> ");
            }
        }

    });
}

function watchEncrypt() {
    var encrypt = niuniu.Encrypt({},
    {
        fromBlock: 'latest',
        toBlock: 'latest'
    })

    // watch for changes
    encrypt.watch(function(error, result) {
        if (!error) {
            console.log(result);
            nums = result.args.cards; //记录加密后的牌数据
            $("#message").append(JSON.stringify(nums) + "</br>");
            if (state != 5) {
                for (var i = 0; i < all_players.length; i++) {
                    if (all_players[i] == result.args.player) {
                        if (i + 1 < all_players.length && all_players[i + 1] == player) {
                            $("#state").text("请加密!");
                            $("#player_A").html("<a>player A: </a><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/>  <img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/> ");
                            $("#player_U").html("<a>player U: </a> <img src='images/shuffle2.gif' /> ");
                        } else {
                            $("#state").text("等待他人加密...");
                            $("#player_U").html("<a>player U: </a><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/>  <img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/> ");
                            $("#player_A").html("<a>player A: </a> <img src='images/shuffle2.gif' /> ");
                        }
                        break;
                    }
                }

            }
        }
    });
}

function watchToUploadKey() {

    var toUploadKey = niuniu.ToUploadKey({},
    {
        fromBlock: 'latest',
        toBlock: 'latest'
    })

    // watch for changes
    toUploadKey.watch(function(error, result) {
        if (!error) {
            state = 5;
            console.log(result);
            $("#player_U").html("<a>player U: </a><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/>  <img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/> ");
            $("#player_A").html("<a>player A: </a><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/>  <img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/> ");
            $("#state").text("请上传秘钥!");
        }
    });
}

function watchuploadkey() {
    var upload = niuniu.uploadkey({},
    {
        fromBlock: 'latest',
        toBlock: 'latest'
    })

    // watch for changes
    upload.watch(function(error, result) {
        if (!error) {
            console.log(result);
            if (result.args.player != player) {
                keysMap.set(result.args.player, result.args.keys);
            }
            if (keysMap.size == all_players.length) {
                var len = nums.length;
                var temp;
                var array = new Array();
                var k;
                if (player == all_players[0]) {
                    k = 0;
                } else {
                    k = 5;
                }
                for (var i = 0; i < 5; i++) {
                    temp = nums[i + k]; //解密牌数据
                    keysMap.forEach(function(v, k, map) {
						temp = expMod(temp, v[i], Q * P);
                    });
					array.push(temp);
                }
				myCardsArray = array;
                console.log("解密牌：" + array);
				$("#player_U").html("<a>player U: </a><img src='images/"+getCardFromNum(array[0])+".jpg' valign='bottom' value = '"+array[0]+"' id='my' onclick='onSelect(this)'/><img src='images/"+getCardFromNum(array[1])+".jpg' valign='bottom' value = '"+array[1]+"' id='my' onclick='onSelect(this)'/><img src='images/"+getCardFromNum(array[2])+".jpg' valign='bottom' value = '"+array[2]+"' id='my' onclick='onSelect(this)'/>  <img src='images/"+getCardFromNum(array[3])+".jpg' valign='bottom' value = '"+array[3]+"' id='my' onclick='onSelect(this)'/><img src='images/"+getCardFromNum(array[4])+".jpg' valign='bottom' value = '"+array[4]+"' id='my' onclick='onSelect(this)'/> ");
                $("#player_A").html("<a>player A: </a><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/>  <img src='images/eback.jpg' valign='bottom'/><img src='images/eback.jpg' valign='bottom'/> ");
				$("#decodeMsg").text(JSON.stringify(array));
            }

        }
    });
}

function watchToPlayCard() {
    var toPlayCard = niuniu.ToPlayCard({},
    {
        fromBlock: 'latest',
        toBlock: 'latest'
    })

    // watch for changes
    toPlayCard.watch(function(error, result) {
        if (!error) {
            $("#state").text("请选择三张牌并出牌!");
        }
    });
}

function watchDiscard() {
    var discard = niuniu.Discard({},
    {
        fromBlock: 'latest',
        toBlock: 'latest'
    })

    // watch for changes
    discard.watch(function(error, result) {
        if (!error) {
            console.log(result);
			if(player!=result.args.player){
				var k = 0;
				var l = 5;
				if(player==all_players[0]){
					k = 5;
					l = 0;
				}
				var otherArray = [];
				var temp;
				var otherFlag = result.args.flag;
				var orders = result.args.order;
				otherKeysMap.set(result.args.player, result.args.keys);
				for (var i = 0; i < 5; i++) {
                    temp = nums[i + k]; //解密牌数据
                    otherKeysMap.forEach(function(v, k, map) {
						temp = expMod(temp, v[i], Q * P);
                    });
					otherArray.push(temp);
                }
				console.log(otherArray);
				otherCardsArray = otherArray;
				$("#player_A").html("<a>player A: </a><img src='images/"+getCardFromNum(otherArray[0])+".jpg' valign='bottom' value = '"+otherArray[0]+"'/><img src='images/"+getCardFromNum(otherArray[1])+".jpg' valign='bottom' value = '"+otherArray[1]+"' /><img src='images/"+getCardFromNum(otherArray[2])+".jpg' valign='bottom' value = '"+otherArray[2]+"' />  <img src='images/"+getCardFromNum(otherArray[3])+".jpg' valign='bottom' value = '"+otherArray[3]+"' /><img src='images/"+getCardFromNum(otherArray[4])+".jpg' valign='bottom' value = '"+otherArray[4]+"' i/> ");
				var otherOrderCards = new Array();
				var orderCards = new Array();
				for(var i = 0;i<5;i++){
					otherOrderCards.push(otherArray[orders[i]-k]);
					orderCards.push(myCardsArray[myOrders[i]-l]);
				}
				var win;
				if(player==banker){
					win = compareCards(orderCards,myFlag,otherOrderCards,otherFlag);
				}else{
					win = compareCards(otherOrderCards,otherFlag,orderCards,myFlag);
				}
				console.log(win);
				var winsRes = new Array();
				winsRes.push(win);
				var hash = niuniu.uploadResult.sendTransaction(winsRes,{from:player,gas:3000000});
				console.log(hash);
			}
        }else{
			alert(error)
		}
		
    });
}

function watchbroadMoney() {
    var broadMoney = niuniu.broadMoney({},
    {
        fromBlock: 'latest',
        toBlock: 'latest'
    })

    // watch for changes
    broadMoney.watch(function(error, result) {
        if (!error) {
            console.log(result);
			var res = result.args[0];
			if((player==banker)^res){
				$("#state").text("恭喜你，你赢了!");
			}else{
				$("#state").text("很遗憾，你输了!");
			}
        }else{
			alert(error)
		}
    });
}