# nextjs-output-with-api-crud

## 技術構成

### フロントエンド

- typescript: 4.8.4
- react: 18.2.0
- react-dom: 18.2.0
- next: 12.3.1
- @fortawesome/react-fontawesom: 0.2.0
- @fortawesome/free-solid-svg-icons: 6.2.0

### バックエンド

- nestjs: 9.0.0
- prisma: 4.4.0
- typescript: 4.3.5

### その他

- docker
- MySQL: 8.0

## 仕様

- Todo リスト
  - 一覧表示
  - 検索処理
  - 新規登録処理
  - 詳細表示
  - 編集処理
  - 削除処理

## 環境構築

※dockerを使用しているのでPCに入っていない場合はインストールをお願いします。

https://matsuand.github.io/docs.docker.jp.onthefly/desktop/mac/install/

### 1. docker image を作成

```
docker-compose build
```

### 2. コンテナを起動

```
// フロントエンド、バックエンド、DBのコンテナを起動する
docker-compose up -d
```

注: 初回起動時は node_modules を install しているので時間がかかる バックエンド、フロントエンドが起動できたかどうかは、以下のコマンドでログを確認

### 3. マイグレーション、シーディング (テーブル、データ作成)

```
make db-setup
```

### 4. ブラウザに表示

```
url: http://localhost
```

注: Todo のデータが表示されない場合は、少し待ってからリロードすること
バックエンドのアプリケーションの立ち上げに少し時間がかかるため

<br >

## 補足

### DB 関連の情報

- 以下の情報を元に「sequel ace」などを用いて DB コンテナにアクセスすれば、DB のデータの状態を確認できる

```
DBMS: mysql: 8.0
host: 127.0.0.1
database: NEXTJS_OUTPUT_WITH_CRUD_DB
user: user
password: pass
port: 3306
```

- sequel ace について
- https://qiita.com/ucan-lab/items/b1304eee2157dbef7774

### DB のデータを初期化したい場合

prisma は migration のロールバック機能がないため、コンテナのボリュームを削除するしかない。 コンテナが起動している状態で、以下のコマンドを実行してボリュームを削除する

```
docker-compose down -v
```

### コンテナのログを確認したい場合

フロントエンド、バックエンド、DB コンテナのログを確認する方法

#### 1. コンテナ ID を確認

コンテナを起動している状態で、以下のコマンドでコンテナ ID(CONTAINER ID)を確認する。

```
docker ps
```

各イメージに対応する コンテナ ID を確認

- バックエンド: nestjs_output_with_crud_backend
- フロントエンド: nextjs-output-with-api-crud_frontend
- DB: mysql:8.0

以下のコマンドで各コンテナのログを確認

```
docker logs -f [コンテナID]
```
