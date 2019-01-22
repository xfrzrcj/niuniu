pragma solidity ^ 0.4.2;

contract NiuNiu {

    // 定义参数：牛牌、余下的的的牌。
    uint[] all;
    //庄家 
    address public banker;
    // 最高出价
    uint public highestBid;
    // 抢庄标志位
    uint8 public flag = 0;

    //对局详情
    struct Round {
        address[] players;
        uint playerIndexToRun; //当前操作玩家
        uint[] decCard;//明文牌数据
        uint uploadKeyNum;//上传秘钥数量
        uint N; //大质数，用于加解密;
        uint P;
        uint Q;
        mapping(address => bool[]) allWins;//每人各自上传的输赢记录
        address[] resultPlayers;
        bool analyse;
    }

    Round public rd;
    uint8 maxPlayers = 2; //最大玩家数量
    uint8 nowPlayers = 0; //当前玩家数量
    uint minMoney = 10000;
    uint minPlayerToStart = 2; //最小开局玩家数
    address[] public players;
    uint8 stage = 0; //对局状态,0未开局,1上传洗牌,2上传加密牌,3上传密钥,4出牌
    uint timeoutBolcks = 100; //超时块长度
    uint bankerMoneylimit = 10000;
    uint singleBet = 1000; //单局押注
    
	address[] addAry; //遍历
	
	

	mapping(address => mapping(uint => uint)) sencondKeys;//第二局秘钥,玩家=>第几张牌=>秘钥
    mapping(address => mapping(uint => uint[])) Fround; //各玩家密文第1轮  里面的mapping表示哪个stage,玩家上传的内容
    mapping(uint => uint[]) CardsKey; //各张牌的密钥组,从1开始，表示第一张牌；
    mapping(address => uint8) orderMap; //次序map
    mapping(address => uint) moneyMap; //赌资数据
    mapping(address => uint) resMap; //牌面结果
    mapping(address => uint8) refundMap; //资金结算
    mapping(address => uint[]) ownCard; //拥有的牌面
    
    
    //开局
    event Start(address[] players);
    //质数事件
    event PrimePut(uint P, uint Q);
    //开始进入洗牌阶段
    event ToShuffle(address player, uint flag);
    //洗牌
    event Shuffle(address player, uint[] cipCards);
    //开始进入加密牌阶段
    event ToEncryptCard(string);
    //玩家上传加密的牌
    event Encrypt(address player, uint[] cards);
    //开始上传密钥 
    event ToUploadKey();
    //上传密钥
    event uploadkey(address player, uint[] keys);
    //重新上传密钥
    event reuploadkey(address);
    //开始进入出牌阶段
    event ToPlayCard();
    //玩牌
    event playcard(address, uint, uint);
    //出牌
    event Discard(address player, uint[] keys,uint8[] order, uint8 flag);
    //被移出房间
    event MoveOutRoom(address, string);
    //有玩家加入
    event CheckInRoom(address player, uint money, uint8 playerNum);
    //
    event broadMoney(bool[]);
    //初始化
    function construct() public {
        maxPlayers = 2;
        minMoney = 10000;
        minPlayerToStart = 2;
        timeoutBolcks = 100000;
        singleBet = 5000;
    }

    //加入房间，同时需要支付赌资到合约上
    function checkIn() payable public {
        require(msg.value > minMoney && nowPlayers < maxPlayers && moneyMap[msg.sender] == 0 && !playerIsIn(msg.sender));
        moneyMap[msg.sender] = msg.value;
        players.push(msg.sender);
        nowPlayers = nowPlayers + 1;
        //orderMap[msg.sender] = nowPlayers;
        emit CheckInRoom(msg.sender, msg.value, nowPlayers);
        if (nowPlayers == maxPlayers) {
            startGame();
        }
    }
	
    function getPlayers() public view returns(address[]){
        return players;
    }

    //开始游戏
    function startGame() private returns(bool) {
        if (players.length >= minPlayerToStart) {
            stage = 1;
            rd = Round(players, 0,new uint[](0),0,0,0,0,new address[](0),false);
            emit Start(players);
            return true;
        } else {
            return false;
        }
    }
    function Upload(uint IP, uint IQ) public {
        require(msg.sender == banker);
        rd.P = IP;
        rd.Q = IQ;
        rd.N = IP * IQ;
        emit PrimePut(IP,IQ);
    }
    //抢庄 快的抢到
    function bidHogs() public returns(bool) {
        /*require(isPlayerInTurn(msg.sender) && stage == 1);*/
        if (flag == 0 && moneyMap[msg.sender] > bankerMoneylimit) {
            banker = msg.sender;
            flag = 1;
            emit ToShuffle(msg.sender, 100);
            return true;
        } else {
            return false;
        }
    }

    //玩家上传洗好的牌(密文)
    function shuffleCard(uint[] cards) public {
        require(isPlayerInTurn(msg.sender) && stage == 1);
        Fround[msg.sender][1] = cards;
        nextTurn();
        emit Shuffle(msg.sender, cards);
        if (rd.playerIndexToRun == 0) { //洗完牌
            stage = 2;
            emit ToEncryptCard("Please upload the ciphertext.");
        }
    }

    //玩家上传加密牌(密文)
    function encryptCard(uint[] cards) public {
        require(isPlayerInTurn(msg.sender) && stage == 2);
        Fround[msg.sender][2] = cards;
        nextTurn();
        emit Encrypt(msg.sender, cards);
        if (rd.playerIndexToRun == 0) { //加密完牌
            rd.decCard = cards;
            stage = 3;
            emit ToUploadKey();
        }
    }
    //玩家上传密钥(一个洗牌密钥,其余玩家牌的密钥)  (n-1)*5
    function uploadKey(uint[] order,uint[] keys) public {
        require(stage == 3);
		Fround[msg.sender][3] = keys;
		rd.uploadKeyNum = rd.uploadKeyNum + 1;
		uint len = order.length;
		for(uint i = 0;i<len;i++){
			sencondKeys[msg.sender][order[i]]=keys[i];
			rd.decCard[order[i]]=encryptAndDecrypt(rd.decCard[i],keys[i],rd.N);
		}
        emit uploadkey(msg.sender, keys);
        if (rd.uploadKeyNum == nowPlayers) { //加密完牌
            stage = 4;
            emit ToPlayCard();
        }
    }

    //出牌
    function playCard(uint[] keys, uint8[] order, uint8 flagb) public {
//		uint[] memory attb = new uint[](3);
//		uint[] memory reb = new uint[](2);
		uint index = playerIndex(msg.sender);
		require(index>0);
//		for(uint i = 0;i<5;i++){
//			sencondKeys[msg.sender][i+index*5]=keys[i];
//			rd.decCard[i+index*5] = encryptAndDecrypt(rd.decCard[i+index*5],keys[i],rd.N);
//			if(i<3){
//			    attb[i] = rd.decCard[order[i]]; 
//			}else{
//			    reb[i] = rd.decCard[order[i]];
//			}
//		}
        emit Discard(msg.sender, keys,order,flagb);
    }
    //传入各玩家和庄家比的庄家输赢
    function uploadResult(bool[] wins) public {
        require(!rd.analyse);
        rd.allWins[msg.sender] = wins;
        rd.resultPlayers.push(msg.sender);
        uint len = rd.resultPlayers.length;
        if(len>1){
            uint plen = wins.length;
            for(uint i = 0;i<plen;i++){
                if(rd.allWins[rd.resultPlayers[len-1]][i]!=wins[i]){
                    rd.analyse=true;
                    analyseResult();
                    break;
                }
            }
        }
        if(len==nowPlayers){
            emit broadMoney(wins);
        }
    }
    
    function analyseResult()public pure{
//        uint len = order.length;
//		uint[] memory attb = new uint[](3);
//		uint[] memory reb = new uint[](2);
//		for(uint i = 0;i<len;i++){
//			sencondKeys[msg.sender][order[i]]=keys[i];
//			decCard[order[i]] = encryptAndDecrypt(decCard[i],keys[i],N);
//			if(i<3){
//			    attb[i] = decCard[order[i]]; 
//			}else{
//			    reb[i] = decCard[order[i]];
//			}
//		}
//          uint res = getResult(attb, reb, flagb);
//        resMap[msg.sender] = res;
//        addAry.push(msg.sender);
//
//      if (addAry.length == nowPlayers) {
//          assignMoney();
//      }
//        emit broadMoney(moneyMap[addAry[0]]);
    }

    //资金结算
    function assignMoney() private returns(uint) {
        uint temp;
        uint resb = resMap[banker];
        for (uint i = 0; i < 2; i++) {
            if (banker != addAry[i]) {
                if (resb < resMap[addAry[i]]) {
                    moneyMap[banker] = moneyMap[banker] - singleBet;
                    moneyMap[addAry[i]] = moneyMap[addAry[i]] + singleBet;
                    temp = 1;
                }
                if (resb > resMap[addAry[i]]) {
                    moneyMap[addAry[i]] = moneyMap[addAry[i]] - singleBet;
                    moneyMap[banker] = moneyMap[banker] + singleBet;
                    temp = 0;
                }
            }

        }
        return temp;
    }
    
    function encryptAndDecrypt(uint m,uint a,uint n) public pure returns(uint M){
        uint at = m;
        uint[] memory bs = getBinary(a);
        uint sz = bs.length;
        if(bs[0]==1){
            M = m%n; 
        }else{
            M = 1;
        }
        for (uint i = 1; i<sz; i++){
            at = at%n;
            at = at*at;
            at = at%n;
            if(bs[i]!=0){
                M = mulmod(M,at,n);
            }
        }
        return M;
    }
    
    function getBinary(uint num) private pure returns(uint[]){
        uint[] memory tempwords = new uint[](256);
        uint i = 0;
        uint s = num;
        while(s!=0){
            tempwords[i] = s%2;
            s >>= 1;
            i++;
        }
        uint[] memory words = new uint[](i);
        for(uint j = 0;j<i;j++){
            words[j] = tempwords[j];
        }
        return words;
    }


    //判断玩家是否应该操作
    function isPlayerInTurn(address player) private view returns(bool) {
        return player == rd.players[rd.playerIndexToRun];
    }

    //切换到下一个
    function nextTurn() private {
        uint nowTurn = rd.playerIndexToRun;
        uint maxP = rd.players.length;
        if (nowTurn >= maxP - 1) {
            rd.playerIndexToRun = 0;
        } else {
            rd.playerIndexToRun++;
        }
    }

    

    function max(uint[] arr) private pure returns(uint) {

        uint a;
        if (arr[0] > arr[1]) {
            a = arr[0];
        } else {
            a = arr[1];
        }
        if (arr[2] > a) {
            a = arr[2];
        }
        if (arr[3] > a) {
            a = arr[3];
        }
        if (arr[4] > a) {
            a = arr[4];
        }
        return a;
    }

    function min(uint x, uint y) private pure returns(uint) {
        uint a = 0;
        if (x < y) {
            a = x;
        } else {
            a = y;
        }
        return a;
    }
    function max2(uint x, uint y) private pure returns(uint) {
        uint a = 0;
        if (x > y) {
            a = x;
        } else {
            a = y;
        }
        return a;
    }
    function DigitalValue(uint x) private pure returns(uint) {
        uint dv = x / 4 + 2;

        if (dv == 14) {
            dv = 1;
        } else {
            dv = min(10, dv);
        }
        return dv;
    }
    function Niu(uint[] at, uint[] t) private view returns(uint) {
        uint res = 0;
        uint color;
        uint value;
        uint temp;
        if ((DigitalValue(at[0]) + DigitalValue(at[1]) + DigitalValue(at[2])) % 10 == 0) {
            res = res + 1 << 10;
            if ((DigitalValue(t[0]) + DigitalValue(t[1])) % 10 == 0) {
                temp = 3 << 8;
                res = res + temp;
            } else {
                temp = ((DigitalValue(t[0]) + DigitalValue(t[1])) % 10) << 6;
                res = res + temp;
            }
            uint v = max2(t[0], t[1]) / 4 + 2;
            uint c = max2(t[0], t[1]) % 4;
            temp = v << 2;
            res = res + temp + c;
        } else {
            value = max(all) / 4 + 2;
            color = max(all) % 4;
            res = value << 2;
            res = res + temp + color;
        }
        return res;
    }
    //all 里面里面是0-51 牌面 
    //flag 0 无牛 1 牛  2 五花牛 3 五小牛
    function getResult(uint[] att, uint[] txs, uint flags) private view returns(uint) {
        uint res = 0;
        uint color;
        uint value;
        uint tem;
        uint[] storage allcards = ownCard[msg.sender];
        if (flags == 0) {
            value = max(allcards) / 4 + 2;
            color = max(allcards) % 4;
            tem = value << 2;
            res = tem + color;
        }
        if (flags == 1) {

            res = Niu(att, txs);
        }
        if (flags == 2) {
            bool bl;
            for (uint8 y = 0; y < 5; y++) {
                bl = bl && (allcards[y] > 35) && (allcards[y] < 48);
            }
            if (bl) {
                value = max(allcards) / 4 + 2;
                color = max(allcards) % 4;
                tem = value << 2;
                res = 1 << 11;
                res = res + tem + color;
            }
        }
        if (flags == 4) {
            uint count = 0;
            uint b = 0;
            for (uint8 i = 0; i < 5; i++) {
                if (allcards[0] == allcards[i]) {
                    count = count + 1;
                }

            }
            for (uint8 j = 0; i < 5; i++) {
                if (allcards[1] == allcards[j]) {
                    b = b + 1;
                }
            }
            if (count == 4) {
                res = 1 << 11;
                res = res + (allcards[0] / 4 + 2) << 2 + allcards[0] % 4;
            }
            if (b == 4) {
                res = 1 << 11;
                res = res + (allcards[1] / 4 + 2) << 2 + allcards[1] % 4;
            }
            if (count != 4 && b != 4) {
                value = max(allcards) / 4 + 2;
                color = max(allcards) % 4;
                res = value << 2 + color;
            }

        }
        if (flags == 3) {
            if (DigitalValue(allcards[0]) + DigitalValue(allcards[1]) + DigitalValue(allcards[2]) + DigitalValue(allcards[3]) + DigitalValue(allcards[4]) <= 10) {
                res = 3 << 11;
            }

        }

        return res;
    }

    function playerIsIn(address player) private view returns(bool) {
        uint len = players.length;
        for (uint i = 0; i < len; i++) {
            if (player == players[i]) {
                return true;
            }
        }
        return false;
    }
	
	function playerIndex(address player) private view returns(uint) {
		uint len = players.length;
        for (uint i = 0; i < len; i++) {
            if (player == players[i]) {
                return i+1;
            }
        }
        return 0;
    }

}