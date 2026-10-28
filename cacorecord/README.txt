ニャープレーヤー｜PWA（インストール対応）

GitHub Pages: https://takeshiuchimi.github.io/cacorecord/song.html

【cacorecord/直下にアップロードするファイル】
 song.html
 manifest.webmanifest
 sw.js
 icons/nya-player-180.png
 icons/nya-player-192.png
 icons/nya-player-512.png

既存の music/ フォルダや karaoke.html は変更不要です。

【利用方法】
 Android Chrome: 公開URLを開き、ページの「アプリとして使う」またはChromeの︙ →「アプリをインストール」／「ホーム画面に追加」
 iPhone: Safariの共有メニュー →「ホーム画面に追加」
 PC: Chrome / Edgeのアドレスバーのインストールアイコンまたはメニュー

【動作】
 アプリ名：ニャープレーヤー（選曲しても変わりません）
 アイコン：ニャーズ猫
 起動URL：パラメータなしのsong.html（4〜8曲をスワイプ切替）
 ?track=7等は従来どおり曲単独表示
 お気に入り登録名も「ニャープレーヤー」
 オフラインは画面表示のみ（MP3はネット接続が必要）

【注意】
 HTTPS公開が必要です。ローカルfile://からはPWAインストールできません。
 AndroidのインストールUIは端末/Chromeバージョンで異なります。
 既にホーム画面に古いショートカットがある場合は削除して再追加すると名前/アイコンが反映されます。
 ファイル配置後、ページを再読込してブラウザからインストールしてください。
