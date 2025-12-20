# 🐺 LiveSync Hub - Change Log (change.md)

## ＜追加・変更点＞

### 1. 依存関係の正常化と SafeArea の適用
* **ライブラリ:** `react-native-safe-area-context` を必須で使用。
* **実装:** 全画面のルートに `SafeAreaProvider` を配置し、ヘッダーレスデザインに伴うノッチ（上部）とインジケーター（下部）の余白を適切に管理。標準の `SafeAreaView` (deprecated) は一切使用しない。

### 2. Dashboard から入力画面への遷移ロジック
Dashboard（モード選択）でモードを選択した際、即座に「コード入力」または「待機状態」へ遷移するよう修正。
* **Liveモード**: ボタン押下 → `Live参加コード入力画面` へ遷移。
* **Normalモード**: ボタン押下 → `動画コード入力画面` へ遷移。
* **会場モード**: ボタン押下 → `/scripts/rooms.ts` を実行し、接続待機ステータスを表示。

### 3. コミュニティ画面 (`/app/community.tsx`)
* **機能:** 配信者・作品ごとの「ファン空間」を表示。
* **UI:** 各種SNSリンクの統合カード、掲示板へのショートカット。
* **ロジック:** `/scripts/firestore.ts` からコミュニティ投稿データを非同期取得。

### 4. チャットシステムの大改革 (`/app/chat-view.tsx`)
操作性と非同期処理を最適化します。
* **非同期処理:** `/scripts/livesync.ts` で受信したデータを `FlatList` の `extraData` で制御し、レンダリング負荷を軽減。
* **スクロール制御:** * ユーザーが上にスクロールしている間は、新着メッセージが来ても自動スクロールを停止。
    * **[最新へ] ボタン**: 画面右下にフローティング表示。押下時に `scrollToEnd` を実行し、一気に最下部へ戻る。
* **触覚:** `expo-haptics` を使用し、スクロール停止時や最新ボタン押下時に微細な振動を実行。

### 5. 部屋滞在中の固定通知 (`/scripts/notifications.ts`)
* **機能:** モードを選択し「部屋」に入っている間、OSの通知領域に固定通知（Ongoing Notification）を表示。
* **表示内容:** 「LiveSync Hub: 〇〇の会場に接続中」
* **実装:** `expo-notifications` を活用。