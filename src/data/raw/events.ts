import { z } from "zod";

import { generateId } from "@/lib/id";
import { Supporter, supporters } from "./supporters";

export const Location = z.object({
  name: z.string(),
  address: z.string(),
});
export type Location = z.infer<typeof Location>;

export const Segment = z.object({
  id: z.string(),
  name: z.string(),
  start_time: z.coerce.date(),
  end_time: z.coerce.date(),
});
export type Segment = z.infer<typeof Segment>;

export const BarEvent = z.object({
  id: z.number(),
  name: z.string(),
  sub_title: z.string().optional(),
  url: z.string().url(),
  start_time: z.coerce.date(),
  end_time: z.coerce.date(),
  max_participants: z.number(),
  participants_count: z.number(),
  location: Location,
  segments: z.array(Segment),
  supporters: z.array(Supporter),
});
export type BarEvent = z.infer<typeof BarEvent>;

export const events = {
  7: {
    id: 7,
    name: "エンジニア Bar #7 桜島を眺めながらのんびり語ろう",
    sub_title: "桜島を眺めながらのんびり語ろう",
    url: "https://engineer-bar.connpass.com/event/311196/",
    start_time: new Date("2024-03-21T19:00:00+09:00"),
    end_time: new Date("2024-03-21T21:00:00+09:00"),
    max_participants: 20,
    participants_count: 30,
    location: {
      name: "イイテラス 11F",
      address: "鹿児島県鹿児島市荒田1丁目16-7",
    },
    segments: [
      {
        id: generateId(),
        name: "オープニング",
        start_time: new Date("2024-03-21T19:00:00+09:00"),
        end_time: new Date("2024-03-21T19:05:00+09:00"),
      },
      {
        id: generateId(),
        name: "スポンサー紹介",
        start_time: new Date("2024-03-21T19:05:00+09:00"),
        end_time: new Date("2024-03-21T19:15:00+09:00"),
      },
      {
        id: generateId(),
        name: "グループ分けして歓談1",
        start_time: new Date("2024-03-21T19:15:00+09:00"),
        end_time: new Date("2024-03-21T19:35:00+09:00"),
      },
      {
        id: generateId(),
        name: "休憩&席替え",
        start_time: new Date("2024-03-21T19:35:00+09:00"),
        end_time: new Date("2024-03-21T19:45:00+09:00"),
      },
      {
        id: generateId(),
        name: "グループ分けして歓談2",
        start_time: new Date("2024-03-21T19:45:00+09:00"),
        end_time: new Date("2024-03-21T20:05:00+09:00"),
      },
      {
        id: generateId(),
        name: "自由時間",
        start_time: new Date("2024-03-21T20:05:00+09:00"),
        end_time: new Date("2024-03-21T20:50:00+09:00"),
      },
      {
        id: generateId(),
        name: "クロージング",
        start_time: new Date("2024-03-21T20:50:00+09:00"),
        end_time: new Date("2024-03-21T21:00:00+09:00"),
      },
    ],
    supporters: [supporters.unimal],
  },
  6: {
    id: 6,
    name: "エンジニア Bar #6 with 忘年会",
    sub_title: "with 忘年会",
    url: "https://engineer-bar.connpass.com/event/301247/",
    start_time: new Date("2023-12-08T21:00:00+09:00"),
    end_time: new Date("2023-12-08T23:00:00+09:00"),
    max_participants: 24,
    participants_count: 11,
    location: {
      name: "GMOペパボ 鹿児島オフィス",
      address: "鹿児島県鹿児島市上荒田町3-1",
    },
    segments: [],
    supporters: [supporters.pepabo],
  },
  5: {
    id: 5,
    name: "エンジニア Bar #5 with メタバース",
    sub_title: "with メタバース",
    url: "https://engineer-bar.connpass.com/event/281127/",
    start_time: new Date("2023-05-24T19:00:00+09:00"),
    end_time: new Date("2023-05-24T21:00:00+09:00"),
    max_participants: 30,
    participants_count: 28,
    location: {
      name: "ライカワークラウンジ",
      address: "鹿児島県鹿児島市中央町19-40",
    },
    segments: [
      {
        id: generateId(),
        name: "オープニング メタバースについての説明",
        start_time: new Date("2023-05-24T19:00:00+09:00"),
        end_time: new Date("2023-05-24T19:15:00+09:00"),
      },
      {
        id: generateId(),
        name: "働き方 例) あなたの会社はリモート派？出社派？あなたの会社に社内勉強会はある？あなたの会社の業務内容は？",
        start_time: new Date("2023-05-24T19:15:00+09:00"),
        end_time: new Date("2023-05-24T19:35:00+09:00"),
      },
      {
        id: generateId(),
        name: "休憩 & 席替え",
        start_time: new Date("2023-05-24T19:35:00+09:00"),
        end_time: new Date("2023-05-24T19:45:00+09:00"),
      },
      {
        id: generateId(),
        name: "学び方 例) これまで参加して良かったイベントや勉強会は？業務外で何か取り組んでいること(勉強・個人開発・副業)はある？",
        start_time: new Date("2023-05-24T19:45:00+09:00"),
        end_time: new Date("2023-05-24T20:05:00+09:00"),
      },
      {
        id: generateId(),
        name: "FREE(希望者のみメタバース体験会)",
        start_time: new Date("2023-05-24T20:05:00+09:00"),
        end_time: new Date("2023-05-24T20:50:00+09:00"),
      },
      {
        id: generateId(),
        name: "クロージング",
        start_time: new Date("2023-05-24T20:50:00+09:00"),
        end_time: new Date("2023-05-24T21:00:00+09:00"),
      },
    ],
    supporters: [supporters.hhgExe, supporters.liKa],
  },
  4: {
    id: 4,
    name: "エンジニア Bar #4",
    url: "https://engineer-bar.connpass.com/event/276358/",
    start_time: new Date("2023-03-22T19:00:00+09:00"),
    end_time: new Date("2023-03-22T21:00:00+09:00"),
    max_participants: 20,
    participants_count: 23,
    location: {
      name: "ライカワークラウンジ",
      address: "鹿児島県鹿児島市中央町19-40",
    },
    segments: [
      {
        id: generateId(),
        name: "オープニング",
        start_time: new Date("2023-03-22T19:00:00+09:00"),
        end_time: new Date("2023-03-22T19:15:00+09:00"),
      },
      {
        id: generateId(),
        name: "会社の様子/社内イベントや福利厚生",
        start_time: new Date("2023-03-22T19:15:00+09:00"),
        end_time: new Date("2023-03-22T19:35:00+09:00"),
      },
      {
        id: generateId(),
        name: "エンジニアの一日",
        start_time: new Date("2023-03-22T19:40:00+09:00"),
        end_time: new Date("2023-03-22T20:00:00+09:00"),
      },
      {
        id: generateId(),
        name: "FREE",
        start_time: new Date("2023-03-22T20:00:00+09:00"),
        end_time: new Date("2023-03-22T20:15:00+09:00"),
      },
      {
        id: generateId(),
        name: "未経験からエンジニアになってみて",
        start_time: new Date("2023-03-22T20:15:00+09:00"),
        end_time: new Date("2023-03-22T20:30:00+09:00"),
      },
      {
        id: generateId(),
        name: "FREE",
        start_time: new Date("2023-03-22T20:30:00+09:00"),
        end_time: new Date("2023-03-22T20:50:00+09:00"),
      },
      {
        id: generateId(),
        name: "クロージング",
        start_time: new Date("2023-03-22T20:50:00+09:00"),
        end_time: new Date("2023-03-22T21:00:00+09:00"),
      },
    ],
    supporters: [supporters.kccs, supporters.liKa],
  },
  3: {
    id: 3,
    name: "エンジニア Bar #3",
    url: "https://engineer-bar.connpass.com/event/265803/",
    start_time: new Date("2022-11-23T19:00:00+09:00"),
    end_time: new Date("2022-11-23T21:00:00+09:00"),
    max_participants: 20,
    participants_count: 27,
    location: {
      name: "HITTOBE",
      address: "鹿児島県鹿児島市呉服町2-8",
    },
    segments: [
      {
        id: generateId(),
        name: "オープニング",
        start_time: new Date("2022-11-23T19:00:00+09:00"),
        end_time: new Date("2022-11-23T19:15:00+09:00"),
      },
      {
        id: generateId(),
        name: "会社の様子/社内イベントや福利厚生",
        start_time: new Date("2022-11-23T19:15:00+09:00"),
        end_time: new Date("2022-11-23T19:35:00+09:00"),
      },
      {
        id: generateId(),
        name: "業務効率化",
        start_time: new Date("2022-11-23T19:40:00+09:00"),
        end_time: new Date("2022-11-23T20:00:00+09:00"),
      },
      {
        id: generateId(),
        name: "ユーザー目線から考えるものづくり",
        start_time: new Date("2022-11-23T20:15:00+09:00"),
        end_time: new Date("2022-11-23T20:30:00+09:00"),
      },
      {
        id: generateId(),
        name: "FREE",
        start_time: new Date("2022-11-23T20:30:00+09:00"),
        end_time: new Date("2022-11-23T20:50:00+09:00"),
      },
      {
        id: generateId(),
        name: "クロージング",
        start_time: new Date("2022-11-23T20:50:00+09:00"),
        end_time: new Date("2022-11-23T21:00:00+09:00"),
      },
    ],
    supporters: [supporters.haruNi, supporters.liKa],
  },
  2: {
    id: 2,
    name: "エンジニア Bar #2",
    url: "https://engineer-bar.connpass.com/event/249302/",
    start_time: new Date("2022-06-29T19:00:00+09:00"),
    end_time: new Date("2022-06-29T21:00:00+09:00"),
    max_participants: 20,
    participants_count: 27,
    location: {
      name: "ライカワークラウンジ",
      address: "鹿児島県鹿児島市中央町19-40",
    },
    segments: [
      {
        id: generateId(),
        name: "オープニング",
        start_time: new Date("2022-06-29T19:00:00+09:00"),
        end_time: new Date("2022-06-29T19:15:00+09:00"),
      },
      {
        id: generateId(),
        name: "働き方 (業務内容・働きやすさ・副業など)",
        start_time: new Date("2022-06-29T19:15:00+09:00"),
        end_time: new Date("2022-06-29T19:45:00+09:00"),
      },
      {
        id: generateId(),
        name: "働きがい",
        start_time: new Date("2022-06-29T19:45:00+09:00"),
        end_time: new Date("2022-06-29T20:15:00+09:00"),
      },
      {
        id: generateId(),
        name: "FREE",
        start_time: new Date("2022-06-29T20:15:00+09:00"),
        end_time: new Date("2022-06-29T20:55:00+09:00"),
      },
      {
        id: generateId(),
        name: "クロージング",
        start_time: new Date("2022-06-29T20:55:00+09:00"),
        end_time: new Date("2022-06-29T21:00:00+09:00"),
      },
    ],
    supporters: [supporters.genbasupport, supporters.liKa],
  },
  1: {
    id: 1,
    name: "エンジニア Bar #1",
    url: "https://engineer-bar.connpass.com/event/238764/",
    start_time: new Date("2022-03-16T19:00:00+09:00"),
    end_time: new Date("2022-03-16T21:00:00+09:00"),
    max_participants: 20,
    participants_count: 24,
    location: {
      name: "ライカワークラウンジ",
      address: "鹿児島県鹿児島市中央町19-40",
    },
    segments: [
      {
        id: generateId(),
        name: "オープニング",
        start_time: new Date("2022-03-16T19:00:00+09:00"),
        end_time: new Date("2022-03-16T19:15:00+09:00"),
      },
      {
        id: generateId(),
        name: "リモート・フレックス",
        start_time: new Date("2022-03-16T19:15:00+09:00"),
        end_time: new Date("2022-03-16T19:35:00+09:00"),
      },
      {
        id: generateId(),
        name: "キャリアアップ・人事評価",
        start_time: new Date("2022-03-16T19:40:00+09:00"),
        end_time: new Date("2022-03-16T20:00:00+09:00"),
      },
      {
        id: generateId(),
        name: "給与＆持ち込み（あれば）",
        start_time: new Date("2022-03-16T20:15:00+09:00"),
        end_time: new Date("2022-03-16T20:30:00+09:00"),
      },
      {
        id: generateId(),
        name: "FREE",
        start_time: new Date("2022-03-16T20:30:00+09:00"),
        end_time: new Date("2022-03-16T20:50:00+09:00"),
      },
      {
        id: generateId(),
        name: "クロージング",
        start_time: new Date("2022-03-16T20:50:00+09:00"),
        end_time: new Date("2022-03-16T21:00:00+09:00"),
      },
    ],
    supporters: [supporters.pepabo, supporters.liKa],
  },
};
