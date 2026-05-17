# Japan Baseball Tours 野球 — Website

## プロジェクト概要

日本へ来るインバウンド旅行者（主にアメリカ人）向けの、日本野球ツアーを紹介するプレミアムランディングページ。

野球を通して日本への訪問を促進し、NPB観戦・甲子園・選手合同練習・グローブ工房体験など、唯一無二の旅行体験を届けるコンセプトサイト。

---

## 実装済み機能

### ページセクション構成
1. **Navbar** — スクロールで背景色が変化、モバイル対応ハンバーガーメニュー
2. **Hero** — フルスクリーンビジュアル、視差スクロール、ツアーへのCTA
3. **Intro Quote** — ブランドメッセージを引用スタイルで表示
4. **Experience** — 6つの体験コンテンツカード（NPB観戦、甲子園、合同練習、工房見学、観光、グッズ購入）
5. **Tour Packages** — 3プラン（Fan Experience / Player Immersion / Family Adventure）+ 料金表示
6. **Itinerary** — 9日間のサンプルスケジュール（タイムライン形式）
7. **Why Japan** — 日本野球の魅力説明セクション
8. **Testimonials** — 旅行者の声スライダー（自動再生、タッチ操作対応）
9. **Numbers** — 実績数値カウントアップアニメーション
10. **Contact Form** — 問い合わせフォーム（DBへの保存機能付き）
11. **Footer** — リンク集、ブランドメッセージ

### インタラクション
- スクロールアニメーション（Intersection Observer使用）
- カウントアップアニメーション（実績数値）
- テスティモニアルスライダー（自動再生 + スワイプ対応）
- 視差スクロール（ヒーロー画像）
- フォーム送信 → DBへ保存 → サクセスメッセージ表示
- モバイル対応ハンバーガーメニュー

---

## ファイル構成

```
index.html          # メインHTMLページ
css/
  └── style.css     # メインスタイルシート（デザイントークン、レスポンシブ対応）
js/
  └── main.js       # JavaScriptインタラクション
README.md           # このファイル
```

---

## エントリーポイント

| パス | 説明 |
|------|------|
| `/index.html` | メインランディングページ（全セクション含む） |
| `#experience` | 体験コンテンツセクション |
| `#tours` | ツアープラン・料金 |
| `#itinerary` | サンプル旅程 |
| `#testimonials` | 旅行者の声 |
| `#contact` | 問い合わせフォーム |

---

## データ管理

### inquiries テーブル（問い合わせDB）
フォーム送信データを保存します。

| フィールド | 型 | 説明 |
|---|---|---|
| id | text | UUID（自動生成） |
| first_name | text | 名 |
| last_name | text | 姓 |
| email | text | メールアドレス |
| tour_type | text | プラン種別（fan/player/family/custom） |
| group_size | text | グループ人数 |
| travel_date | text | 希望渡航時期 |
| message | rich_text | メッセージ本文 |
| submitted_at | datetime | 送信日時 |

**API エンドポイント:** `tables/inquiries`

---

## デザインコンセプト

### カラーパレット
| 変数 | 値 | 用途 |
|---|---|---|
| `--color-primary` | `#1a1a2e` | メインダーク（ネイビー） |
| `--color-accent` | `#c9a84c` | ゴールド（アクセント） |
| `--color-off-white` | `#f8f5f0` | 背景（温かみのある白） |

### フォント
- **見出し**: Playfair Display（セリフ体、プレミアム感）
- **本文**: Inter（サンセリフ、読みやすさ重視）

---

## ツアー料金情報
| プラン | 料金（目安） | ターゲット |
|---|---|---|
| Fan Experience | $5,500〜 | 野球ファン・大人 |
| Player Immersion | $6,800〜 | 選手（小〜高校生含む） |
| Family Adventure | $5,500〜 | 親子・ファミリー |
※8泊9日 / 1人あたり（JPY換算 約80万〜100万円）

---

## 未実装・今後の推奨機能

- [ ] ツアー詳細ページ（各プランの個別LP）
- [ ] ブログ/旅行記ページ
- [ ] 多言語対応（日本語版）
- [ ] 問い合わせ管理ダッシュボード（管理者用）
- [ ] GoogleマップAPI連携（訪問スポット地図）
- [ ] Stripe等の決済フォーム（デポジット受付）
- [ ] SNS連携（Instagram フィード埋め込み）
- [ ] ツアー催行スケジュールカレンダー
- [ ] SEO強化（OGP対応、sitemap.xml）

---

## 技術スタック
- HTML5 / CSS3 / Vanilla JavaScript
- Google Fonts（Playfair Display, Inter）
- Font Awesome 6.4.0（アイコン）
- RESTful Table API（フォームデータ保存）
- Intersection Observer API（スクロールアニメーション）
