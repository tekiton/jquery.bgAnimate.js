jquery.bgAnimate.js
===================

何これ？
--------
縦に連結した画像をbackgroundに指定し、setIntervalで定期的にbackground-positionを移動することでアニメーション表示をするためのjQueryプラグインです。
誰かが既に作ってそうだけど、この手法の名前がわからなくて、諦めて自分で書いてみた的な。



使い方
------
jquery.bgAnimate.jsを読み込んで、divなどの背景に連結した画像を指定します。

* HTML
```html
<div class="#icon01">alternative text</div>
```

* CSS
```css
#icon_01 { width:112px; height:56px; background:url(../images/icon_01.png) 0 0; text-indent:-9999px; }
```

* JS
```javascript
$(function(){
    $('#icon_01').bgAnimate({/* option */});
});
```



オプション
----------
bgAnimate() を実行する際、引数を与えることで動作の設定変更ができます。

* height:integer  
  画像の高さ。指定がなければ、対象要素の高さを使って計算します。

* duration:integer  
  何ミリ秒で次のフレームに移動するか。

* frame:integer  
  フレーム数。

* loop:integer  
  繰り返し回数。既定だと繰り返しません（＝0）。-1で無限に繰り返します。

* autoplay:boolean  
  実行と同時に再生開始するかどうか。

* onPlay:function  
  再生開始時に実行されるコールバック関数。

* onStop:function  
  再生停止時に実行されるコールバック関数。

* onPause:function  
  一時停止時に実行されるコールバック関数。

* onComplete:function  
  設定されたループ回数をループし終わった際に実行されるコールバック関数。



API
---
実行後、各要素の data('bgAnimate') から再生/停止を行うことができます。

* play()  
アニメーションを再生します。再生中は無効です。  
onPlay() が実行されます。最後まで再生すると onStop() と onComplete() が実行されます。

* start()  
play() のエイリアスです。

* pause()  
アニメーションを一時停止させます。次に play() した際は続きからスタートします。  
onPause() が実行されます。

* stop()  
アニメーションを停止させます。次に play() した際は最初からスタートします。  
onStop() が実行されます。



ライセンス
----------
This is MIT LICENSE :)

