Ca&coRD — 独立インストール修正版（v2）
======================================

【修正の要点】
・アプリ識別子を新しく固有の値に変更
  /cacorecord/cacord-records-pwa-2026
・インストール対象範囲を /cacorecord/index.html に限定
・NyaPlay/NyaKara等の別アプリ画面で開いた場合も、
  「Ca&coRDがインストール済み」と誤判断してボタンを消さない
・インストール不可時には、Chrome/Safariで開く手順とURLコピーを表示
・第1〜3曲の音源・歌詞・ジャケット・表示ロジックは変更なし

【GitHub Pagesへの配置】
ZIP内のファイルすべてを cacorecord リポジトリ直下へ上書き・追加。
  index.html
  cacord.webmanifest
  cacord-sw.js
  icons/cacord-180.png
  icons/cacord-192.png
  icons/cacord-512.png

ブラウザーで開くURL：
https://takeshiuchimi.github.io/cacorecord/index.html

※ GitHub PagesへのアップロードはこのZIPでは実行しません。
※ 過去に同じサイトからホーム画面に追加した旧ショートカットがある場合は、
  それをCa&coRDと誤認しないよう、アイコンとアプリ名を確認してください。
  新しいアプリの識別子を変えているため、旧版が別に残る場合があります。
※ 古いキャッシュが表示された場合はChromeのページを再読み込みして
  インストール操作を試してください。別アプリを削除する必要はありません。
※ Android実機のインストール状態は外部からは確認できません。
※ 再生にはインターネット接続が必要です。
