// 必要なモジュールをインポート
const fs = require("fs"); // ファイルシステムにアクセスするため
const path = require("path"); // ファイルパスの操作を簡素化
const glob = require("glob"); // ファイルのパターンマッチングを行うため

// ダミーテキストとしてチェックしたいパターンのリスト
// ここに追加・変更することで、他のダミーテキストも検索可能
const dummyTextPatterns = [
  /lorem ipsum/i, // 英語のダミーテキスト
  /dummy text/i, // 英語のダミーテキスト
  /sample text/i, // 英語のダミーテキスト
  /あいうえお/i, // 日本語のダミーテキスト
  /サンプルテキスト/i, // 日本語のサンプルテキスト
];

// HTMLファイルを対象に検索を行う。node_modulesディレクトリは除外
// **/*.html はリポジトリ内の全てのHTMLファイルを対象
const files = glob.sync("**/*.html", { ignore: "node_modules/**" });

let hasDummyText = false; // ダミーテキストが見つかったかどうかのフラグ

// すべてのHTMLファイルに対して繰り返し処理を行う
files.forEach((file) => {
  // 各HTMLファイルの内容を読み込む
  const content = fs.readFileSync(file, "utf8");

  // 各パターンを使ってダミーテキストが含まれているかチェック
  dummyTextPatterns.forEach((pattern) => {
    if (pattern.test(content)) {
      // ダミーテキストが見つかった場合、ファイル名とともにコンソールに出力
      console.log(`Dummy text found in ${file}`);
      hasDummyText = true; // フラグを立てる
    }
  });
});

// ダミーテキストが見つかった場合、エラーメッセージを出力しプロセスを終了
if (hasDummyText) {
  console.error("Error: Dummy text found in one or more HTML files.");
  process.exit(1); // 非0ステータスで終了し、GitHub Actionsを失敗させる
} else {
  // ダミーテキストが見つからなかった場合
  console.log("No dummy text found.");
}
