Ca&coRD / NyaPlay / NyaKara 統合PWA設定 v6（3アプリ・3Service Workers）
==========================================
公開URLを変えずに、同じ GitHub Pages の cacorecord リポジトリへ配置する一式です。
https://takeshiuchimi.github.io/cacorecord/index.html

【配置】
ZIPを展開し、以下のファイルを既存リポジトリのルートにアップロード／同名ファイル上書きしてください。
 index.html                 Ca&coRD：1〜3曲のみ
 song.html                  NyaPlay：既存10曲、旧ルートSWを個別SWへ移行
 karaoke.html               NyaKara：既存10曲、マニフェスト参照を更新
 cacord.webmanifest         Ca&coRDのアプリ識別子／対象範囲
 manifest.webmanifest       NyaPlayの既存IDを維持しscopeを限定
 karaoke.webmanifest       NyaKaraのアプリ設定（下記注記あり）
 cacord-sw.js               Ca&coRD専用SW
 nya-play-sw.js             NyaPlay専用SW
 nya-kara-sw.js             NyaKara専用SW（今回追加）
 icons/cacord-180.png
 icons/cacord-192.png
 icons/cacord-512.png

【既存ファイル】
既存の /icons/nya-player-192.png、nya-player-512.png、nya-kara-192.png、nya-kara-512.png
および /music/ 音源群は削除せず、そのまま残してください（本ZIPには含みません）。
既存の sw.js も削除不要です。アプリの更新時に旧ルートSW登録だけを解除します。

【重要】
NyaKaraの元の karaoke.webmanifest は今回の会話に添付されていないため、
アプリIDを現在の起動URLと同じ ./karaoke.html として生成しています。
もし現行マニフェストの id が異なる値なら既存PWAと別アプリ扱いになる場合があります。
その場合は現行のidを引き継ぐ必要があります。

【端末での確認】
1. ZIPのファイルを同名の場所にアップロードする。
2. Chromeの通常タブから /cacorecord/index.html を再度開き、再読み込みする。
3. ページ内の「Ca&coRDをインストール」を押すかChromeの︙メニューを確認する。
4. 「インストール済み」のままなら、旧NyaPlayのインストール済みスコープの更新が
   端末側に残っている可能性があります。ファイルだけで強制修正はできません。
   NyaPlayを一度起動して閉じ、Chromeを再起動してから再確認してください。

【変更しない内容】
音源URL、ジャケット、歌詞同期、全曲データ、再生機能は変更していません。
HTMLの内容変更はPWAマニフェスト参照とService Worker移行のみです。

技術的制約：複数PWAを同一ドメインに置くことはChromeの公式資料でも制約があります。
互換性を保証するものではなく、実際のAndroid Chromeでのインストール確認が必要です。

【v6の修正】
NyaKaraに専用の nya-kara-sw.js を追加し、karaoke.htmlからscope ./karaoke.htmlで登録。
3アプリのSWは3本、マニフェストも3個、それぞれ固有のid/scopeを使用しています。
Service WorkerはChromeのインストールに必須ではありませんが、アプリごとに管理範囲を分離して運用します。
旧インストール状態はAndroid／Chromeの端末側に残る場合があり、実機確認が必要です。
