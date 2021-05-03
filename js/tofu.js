//定義
let count = 0;  //点数
let randomTofuNumber;  //乱数
const tofuList = [{ name: "tofu", score: 1, message: "ただのとうふ。" }, { name: "tofu", score: 1, message: "とうふ。" },
{ name: "tofu", score: 1, message: "ただのとうふようだ。" }, { name: "tofu", score: 1, message: "とうふだ。" },
{ name: "tofu_negi", score: 2, message: "うーん　ねぎ。。" }, { name: "tofu_negi", score: 2, message: "ねぎトッピングー" },
{ name: "tofu_negi", score: 2, message: "ねぎー＞＜" }, { name: "tofu_shoyu", score: 2, message: "王道 しょうゆ" },
{ name: "tofu_shoyu", score: 2, message: "無難にしょうゆ" }, { name: "tofu_shoyu", score: 2, message: "しょうゆですね。" },
{ name: "tofu_negi_shouga", score: 2, message: "ねぎしょうが" }, { name: "tofu_negi_shouga", score: 2, message: "ねぎ＆しょうが" },
{ name: "tofu_negi_shouga", score: 2, message: "NEGI＄SHOUGA" }, { name: "tofu_katuo", score: 3, message: "かつおさいこー" },
{ name: "tofu_katuo", score: 3, message: "ベストマッチ　カツオ" }, { name: "tofu_shouga", score: 3, message: "しょうがうまい！" },
{ name: "tofu_shouga", score: 3, message: "しょうがだー！！" }, { name: "tofu_wasabi", score: -5, message: "残念　わさびだ😭" },
{ name: "tofu_love", score: 7, message: "とうふちゃんが舞い降りた❤️" }]; //豆腐
let gameCount = 0;

$('#call').hide(); //いただきますを隠す


//スタート
$('#start').on('click', function () {
    //alert('開始');

    //掲示板を非表示
    $('.start').addClass('nonDisplay');

    //いただきますして、豆腐動かし始める
    startTofu();

})

// setIntervalを使う方法
//https://www.sejuku.net/blog/24629
function sleep(waitSec, callbackFunc) {
    // 経過時間（秒）
    var spanedSec = 0;

    // 1秒間隔で無名関数を実行
    //setInterval指定ミリ秒間隔で同じメソッドの実行を繰り返す
    var id = setInterval(function () {

        spanedSec++;
        console.log("経過時間：" + spanedSec);
        // 経過時間 >= 待機時間の場合、待機終了。
        if (spanedSec >= waitSec) {

            // タイマー停止
            clearInterval(id);

            // 完了時、コールバック関数を実行
            if (callbackFunc) callbackFunc();
        }
    }, 1000);  //一秒
}

function startTofu() {
    //いただきます表示
    //easing:http://semooh.jp/jquery/cont/doc/easing/
    $('#call').toggle(1000, "easeOutBounce", function () {
        //1秒止める
        sleep(1, function () {
            console.log('まった！');
            //いただきます非表示
            $('#call').toggle(1000, "linear");
            //alert("クラス名２" + $('#call').attr('class'));
            //豆腐動かし開始
            tofuMove();
        });
    });
}




//再スタート
$('#restart').on('click', function () {
    //終了メッセージを非表示
    $('.finish').removeClass('display');

    //動かし回数を初期化
    gameCount = 0;

    //得点表示の初期化
    $('#score').text('0点');

    //いただきますして、豆腐動かし始める
    startTofu();

})

//豆腐の動き
function tofuMove() {
    //動かし回数＋
    gameCount++;

    //初期化
    initiateTofu();

    //動くじゃんけんの手の設定
    //乱数で取得
    let randomNumber = Math.floor(Math.random() * 3);
    //ファイル名の定義
    const handList = ["gu", "choki", "pa"];
    $('.tofu_hand').attr('id', randomNumber); //ID設定
    $('.tofu_hand').attr('src', './images/' + handList[randomNumber] + '.png'); //がぞ設定

    //豆腐の設定
    randomTofuNumber = Math.floor(Math.random() * 19);
    console.log(randomTofuNumber);
    $('#tofu_anime').attr('src', './images/' + tofuList[randomTofuNumber].name + '.png'); //がぞ設定
    $('#tofu_anime').addClass(tofuList[randomTofuNumber].name); //クラス設定

    //速さの設定
    const speedList = [4000, 3000, 3000, 2000, 1000];
    let randomSpeedNumber = Math.floor(Math.random() * 5);
    let speed = speedList[randomSpeedNumber];

    //動く豆腐
    //https://tetch1987.com/shittakabull/web/jquery-move-youso/
    $('.tofu_set').animate({ 'top': '50px', 'left': '750px' }, speed, function () {
        $('.tofu_set').toggle(500, function () {
            $('.tofu_set').css('left', '');
            $('.tofu_set').toggle();
        });
        tofuFinish();
    });
}


//豆腐動きの終了時に動き
//７回で終わり
function tofuFinish() {
    // alert("回数" + gameCount);
    if (gameCount == 7) {
        //勝敗を非表示
        $('#result').text('');
        // alert("終了：" + count + "点");
        $('#message').text("得点：" + count + "点");
        $('.finish').addClass('display');
    } else {
        tofuMove();
    }
}

//豆腐動き初めの初期化
function initiateTofu() {
    //勝敗表示を消す
    $('#result').text('');
    //手の大きさを戻す
    $('.hand').removeClass('big_hand');
}

//じゃんけんの手を選択した時
$('.hand').on('click', function () {
    //ちょっと大きくする
    $(this).addClass('big_hand');
    //選択していない手を暗くする

    //選択した手の取得
    let select_id = $(this).attr('id');

    //動いている手の取得
    let move_id = $('#tofu_image .tofu_hand').attr('id');

    //じゃんけん結果の判定
    if (getResult(select_id, move_id) == 0) {
        //動きを止める
        $('.tofu_set').stop(true, false);

        //真ん中へ移動
        $('.tofu_set').animate({ 'top': '180px', 'left': '350px' }, 1000, function () {
            //点数加算
            count += tofuList[randomTofuNumber].score;
            //点数表示
            $('#score').text(count + '点');

            //勝敗表示
            $('#result').css('color', '#e95464');
            $('#result').html(tofuList[randomTofuNumber].message + '<br>' + tofuList[randomTofuNumber].score + '点!! ');
        });
        // alert("かち");
        //豆腐を元の位置に戻す
        $('.tofu_set').toggle(500, function () {
            $('.tofu_set').css('left', '');
            $('.tofu_set').css('top', '');
            $('.tofu_set').toggle();
            tofuFinish();
        });
    } else if (getResult(select_id, move_id) == 1) {
        //負け
        //動きを止める
        $('.tofu_set').stop(true, false);

        //勝敗表示
        $('#result').css('color', '#84b9cb');
        $('#result').text('敗北、、');


        //豆腐を素早く移動
        $('.tofu_set').animate({ 'top': '50px', 'left': '750px' }, 500, function () {
            $('.tofu_set').toggle(500, function () {
                //alert('b');
                $('.tofu_set').css('left', '');
                $('.tofu_set').toggle();
            });
            tofuFinish();
        });
    } else if (getResult(select_id, move_id) == 2) {
        //アイコ
        //動きを止める
        $('.tofu_set').stop(true, false);

        //勝敗表示
        $('#result').css('color', '#38b48b');
        $('#result').text('引分。');

        //豆腐を素早く移動
        $('.tofu_set').animate({ 'top': '50px', 'left': '750px' }, 500, function () {
            $('.tofu_set').toggle(500, function () {
                //alert('b');
                $('.tofu_set').css('left', '');
                $('.tofu_set').toggle();
            });
            tofuFinish();
        });
    }


})

//じゃんけん結果の取得
function getResult(select_id, move_id) {
    let result;
    if (select_id == move_id) {
        //あいこの時
        result = 2;
    } else {
        //あいこ以外の時
        //ぐー
        if (select_id == 0) {
            if (move_id == 1) { //ちょき：勝ち
                result = 0;
            } else if (move_id == 2) { //パー：負け
                result = 1;
            }
        } else if (select_id == 1) {  //ちょき
            if (move_id == 2) {  //ぱー：かち
                result = 0;
            } else if (move_id == 0) { //ぐー：まけ
                result = 1;
            }
        } else if (select_id == 2) {  //ぱー
            if (move_id == 0) {  //ぐー：かち
                result = 0;
            } else if (move_id == 1) {  //ちょき：まけ
                result = 1;
            }
        }
    }
    return result;
}

