# 🐺 LiveSync Hub - Requirements

## 1. 技術スタック
* **Frontend (`/app`):** Expo (React Native), Expo Router
* **Logic (`/scripts`):** TypeScript, Expo APIs (AuthSession, SecureStore, Haptics)
* **Styling:** StyleSheet (NativeWind/Tailwind非推奨)
* **Design Assets:** `expo-linear-gradient`
* **Color Palette:**
    * color1: `#6892ad`
    * color2: `#e28862`
    * Gradient: 左(color1) から 右(color2) へ

## 2. データ定義
### channels (配信者・ハブ情報)
| カラム | 型 | 必須 | 備考 |
| :--- | :--- | :--- | :--- |
| id | String | 必須 | 各プラットフォームのチャンネルID |
| platform | String | 必須 | YouTube / Twitch / TikTok |
| name | String | 必須 | 配信者名 |
| icon_url | String | 任意 | アイコン画像URL |

### chat_logs (統合チャット)
| カラム | 型 | 必須 | 備考 |
| :--- | :--- | :--- | :--- |
| id | String | 必須 | メッセージ一意識別子 |
| user_name | String | 必須 | 投稿者名 |
| message | String | 必須 | コメント本文 |
| platform | String | 必須 | 送信元プラットフォーム |
| created_at | DateTime | 必須 | 受信日時（システム日付） |

## 3. 画面一覧

### ヘッダ (共通)
* **構成:** `/app/_layout.tsx` で定義。
* **表示:** アプリ名「LiveSync Hub」を中央に配置。
* **スタイル:** 背景は `color1` から `color2` へのグラデーション。

### 統合チャット画面 (`/app/index.tsx`)
* **機能:** `/scripts/chat-engine.ts` から取得したチャットを一覧表示。
* **表示順:** `created_at` の降順（新しいものが下）。
* **UI要素:** プラットフォーム識別アイコン、ユーザー名、メッセージ。
* **ロジック:** 新着受信時に `/scripts/haptics.ts` を実行し、微細な振動を発生させる。
* **アクション:** 下部に「参加型イベント」への遷移ボタンを配置。

### ログイン画面 (`/app/login.tsx`)
* **機能:** 各プラットフォーム(YouTube/Twitch/TikTok)のログイン。
* **ロジック:** 1. ボタン押下で `/scripts/auth-fetch.ts` を実行。
    2. `expo-auth-session` で認証。
    3. トークンを `/scripts/storage.ts` (SecureStore) に保存。
* **スタイル:** `color1` & `color2` を基調としたシンプルなボタンデザイン。

### 参加型イベント画面
* **機能:** 投票・クイズ・リアクション戦。
* **ロジック:** 1. `/scripts/games.ts` でサーバー（Firestore等）と同期。
    2. 回答送信時に `/scripts/haptics.ts` で成功フィードバックを実行。

## 4. 開発・自動化ルール
1. **コードの分離:** 表示に関わるコードは `/app` に、API実行や処理ロジックは `/scripts` に記述すること。
2. **API活用:** `expo-auth-session`, `expo-secure-store`, `expo-haptics` を優先的に使用すること。