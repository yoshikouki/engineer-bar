import { generateId } from "@/lib/id";
import { z } from "zod";

export const Topic = z.object({
  id: z.string(),
  content: z.string(),
  category: z.string().optional(),
});
export type Topic = z.infer<typeof Topic>;

export const topics: Topic[] = [
  {
    id: generateId(),
    content: "スキルアップ方法",
    category: "キャリアアップ",
  },
  {
    id: generateId(),
    content: "社内外の勉強会",
    category: "キャリアアップ",
  },
  {
    id: generateId(),
    content: "業務外の学習活動",
    category: "キャリアアップ",
  },
  {
    id: generateId(),
    content: "未経験からのエンジニアキャリア",
    category: "キャリアアップ",
  },
  {
    id: generateId(),
    content: "人事評価制度",
    category: "評価と報酬",
  },
  {
    id: generateId(),
    content: "給与",
    category: "評価と報酬",
  },
  {
    id: generateId(),
    content: "リモートワーク",
    category: "働き方",
  },
  {
    id: generateId(),
    content: "フレックス制度",
    category: "働き方",
  },
  {
    id: generateId(),
    content: "副業",
    category: "働き方",
  },
  {
    id: generateId(),
    content: "業務内容",
    category: "働き方",
  },
  {
    id: generateId(),
    content: "働きがい",
    category: "働き方",
  },
  {
    id: generateId(),
    content: "業務効率化",
    category: "働き方",
  },
  {
    id: generateId(),
    content: "福利厚生",
    category: "会社環境",
  },
  {
    id: generateId(),
    content: "社内イベント",
    category: "会社環境",
  },
  {
    id: generateId(),
    content: "社内勉強会",
    category: "会社環境",
  },
  {
    id: generateId(),
    content: "ユーザー視点でのものづくり",
    category: "開発スタイル",
  },
  {
    id: generateId(),
    content: "エンジニアの一日",
    category: "開発スタイル",
  },
  {
    id: generateId(),
    content: "メタバース",
    category: "最新トレンド",
  },
  {
    id: generateId(),
    content: "参加者からの持ち込みテーマ",
    category: "その他",
  },
  {
    id: generateId(),
    content: "開発環境へのこだわり",
    category: "開発スタイル",
  },
  {
    id: generateId(),
    content: "愛用エディター",
    category: "開発スタイル",
  },
  {
    id: generateId(),
    content: "興味を惹かれるトピック",
    category: "開発スタイル",
  },
  {
    id: generateId(),
    content: "最近のやらかし",
    category: "その他",
  },
];
