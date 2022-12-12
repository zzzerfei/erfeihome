module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["feat", "fix", "revert"]], // commit 正文的前缀
    "subject-max-length": [1, "always", 30], // commit 长度
  },
};