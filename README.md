
# バドミントン ダブルス得点


## スコア
---
得点を記録し、スコアシートを更新します。


## 対応ブラウザ
---
開発および動作確認はChromeで実施しています。

ブラウザ互換性（MDN Web Docsを参照）を以下に示しますが、動作確認は未実施です。

対応ブラウザ
- Chrome
- Edge
- Firefox
- Opera
- Safari
- WebView Android
- Chrome Android
- Firefox for Android
- Opera Android
- Safari on iOS
- Samsung Internet

非対応ブラウザ
- Internet Explorer


## ローカルでの確認方法
---
1. SSL化（http→https）のため、OpenSSLをインストールして、自己証明書を作成
```
openssl req -x509 -newkey rsa:4096 -sha256 -nodes -keyout vscode_live_server.key.pem -out vscode_live_server.cert.pem  -subj "//CN=example.com" -days 3650
```
2. VSCode 拡張機能 Live Server の https 設定に、1.で作成した pem を追加
3. 自己証明書で Service Worker を動かすため、Chrome の起動オプションを追加して起動
```
C:\Program Files\Google\Chrome\Application\chrome.exe" ^
     --user-data-dir=C:\Users\ty331831\Documents\src\ChromeUserData ^
     --unsafely-treat-insecure-origin-as-secure=https://localhost ^
     --allow-insecure-localhost ^
     --ignore-certificate-errors
```
4. index.html を Live Server で起動し、https://127.0.0.1:5500/index.html にアクセス


## 参考文献
---
バドミントン競技規則 - 日本バドミントン協会
- https://www.badminton.or.jp/rule/docs/rule_20200617.pdf

バドミントンルール百科
- https://badminton-rule.com/index.html

バドミントンの主審とスコアシートの書き方を覚えよう
- https://mikanclub.com/referee.html
