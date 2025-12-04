# 🐺 LiveSync Hub  
SnakeWolf（https://snakewolf.com）が提供する  
**依存プラットフォーム × 参加型ライブ × コミュニティ特化アプリ**

---

## 📌 概要  
**LiveSync Hub** は YouTube / Twitch / TikTok などの既存配信プラットフォームの  
**アーカイブ・動画機能に依存しつつ、参加型体験とコミュニティ性を最大化する** 新しいライブ拡張アプリです。

- 既存プラットフォームのライブ・アーカイブ・投稿をそのまま利用  
- 複数サービスのチャットを 1 つの画面へ統合  
- 配信者と視聴者が参加できるイベント機能  
- コミュニティ中心の SNS 的な空間  

視聴ではなく、**「参加するライブ」** を実現します。

---

## 🐺 開発・提供元：SnakeWolf  
- 公式サイト：https://snakewolf.com  
- ミッション：  
  > “世界中のクリエイターと視聴者の距離をゼロにする  
  >  コミュニティ × リアルタイム体験の未来を創る”

---

## 🎯 ミッション  
既存のライブ配信サービスにはない  
**コミュニティ・参加性・双方向性** を補う“拡張プラットフォーム”を提供する。

---

## 🚀 クラウドファンディングについて  
LiveSync Hub は初期開発費用を **クラウドファンディングで調達** します。

### 主な使用用途  
- Google Cloud インフラ費（Cloud Run / Firestore など）  
- チャット連携サーバーの構築  
- マルチプラットフォーム対応 UI/UX 開発  
- Flutter モバイルアプリの開発  
- 初期サーバー運用・保守  

### 支援者リターン例  
- 早期アクセス権  
- “Founder Badge（創設者バッジ）”  
- 非公開フィードバック Discord 参加権  
- ライブ統計の高度版（配信者向け）  
- クレジット掲載（任意）

---

## 📦 機能一覧

### 🔗 1. **チャット統合（LiveSync Engine）**
- YouTube Live Chat  
- Twitch Chat（IRC / EventSub）  
- TikTok LIVE Chat  
➡ **すべて1つの画面で同期表示**

### 👥 2. **コミュニティ機能**
- チャットルーム  
- 音声通話  
- 配信者・作品ごとのファン空間  
- 参加型イベント掲示板  

### 🎮 3. **参加型ライブ機能**
- 投票  
- クイズ  
- 早押しゲーム  
- 絵文字リアクション  
- コメントバトルイベント  

### 🧭 4. **推しハブ（Creator Hub）**
- 配信スケジュール  
- 各プラットフォームのリンク統合  
- 最新動画の表示  
- ファンメッセージ公開板  

---

## 🏛 アーキテクチャ（Google Cloud 基盤）  
**Frontend**  
- Next.js / React  
- Flutter（iOS / Android）  
- TailwindCSS  
- WebSocket / Socket.IO

**Backend（Google Cloud）**  
- Cloud Run（主要 API / WebSocket サーバー）  
- Cloud Firestore（DB）  
- Cloud Pub/Sub（非同期チャット処理）  
- Cloud Storage（ユーザーデータ）  
- Cloud Functions（補助 API）

---

## 🔌 外部 API  
### YouTube  
- Live Chat API  
- YouTube Data API  

### Twitch  
- Helix API  
- EventSub  
- IRC Chat  

### TikTok  
- TikTok LIVE WebSocket API  
- TikTok Base API  

---

## 🎮 参加型ゲームシステム  
- 投票（2択〜多択）  
- リアクション戦  
- 早押しクイズ  
- 4択クイズ  
- ビンゴ  
- コメントコマンドバトル  
- じゃんけん  

---

## 🛠 技術スタック  
- **Frontend**：Next.js / React / Flutter  
- **Backend**：Node.js / TypeScript  
- **Database**：Firestore  
- **Realtime**：WebSocket / Socket.IO  
- **Hosting**：Google Cloud Run  
- **Auth**：Firebase Authentication + OAuth（Google, Twitch, TikTok）

---

## 🧪 進捗状況  
- [ ] Chat 統合モジュール（LiveSync Engine）  
- [ ] コミュニティ機能  
- [ ] 参加型ゲーム（最初の3種）  
- [ ] Creator Hub  
- [ ] モバイルアプリ（Flutter）  
- [ ] クラファン準備  

---

## 🤝 コントリビューション  
Pull Request・Issue 受付中  
特に歓迎：  
- UI/UX デザイナー  
- Flutter エンジニア  
- GCP エンジニア  
- Node.js 開発者  

---

## 📄 ライセンス  
MIT License

---
