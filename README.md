# タスクボードアプリ（Task Board App）

このアプリは、Next.js（App Router構成）を使って構築された、ドラッグ＆ドロップ対応のタスク管理アプリケーションです。状態はuseReducerで管理され、localStorageに永続化されます。

## 公開URL

[Vercelでホスティング中のデモサイト](https://task-board-app-five.vercel.app/)
（※実際のURLに差し替えてください）

## 主な技術スタック

- Next.js (App Router構成)
- React + TypeScript
- Tailwind CSS
- useReducer + localStorage
- @hello-pangea/dnd（ドラッグ＆ドロップ）

## 主な機能

- タスクの追加・編集・削除
- タスクのステータス（Todo / Doing / Done）変更
- カラム間のドラッグ＆ドロップ
- localStorage による状態の保存
- ローディング時のSkeleton UI表示

## ディレクトリ構成（一部）

```
src/
├── app/               // App Router用のルートディレクトリ
├── components/        // Atomic Designに基づくUIコンポーネント
├── hooks/             // カスタムフック（useTasksなど）
├── lib/               // 汎用的な関数
├── types/             // 型定義
```

## ▶開発環境での起動方法

リポジトリをclone後、該当ディレクトリで以下のコマンドを実行してください。

```bash
yarn
```

`http://localhost:3000` でアプリが確認できます。

## 開発用コマンド

依存パッケージをインストールした後、開発サーバーを起動します。

```bash
yarn dev          # 開発サーバー起動
```

## 本番ビルド

```bash
yarn build
yarn start
```

## デプロイ方法

このアプリはVercelに連携されており、GitHubに `push` することで自動的にデプロイされます。  
mainブランチは本番環境、その他のブランチはプレビューデプロイとして個別のURLで確認可能です。

## ライセンス

このリポジトリは MIT ライセンスのもとで公開されています。

## 開発者

- [otoiron](https://github.com/otoiron)