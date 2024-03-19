import { z } from "zod";

export const Supporter = z.object({
  id: z.string(),
  name: z.string(),
  short_name: z.string(),
  url: z.string().url(),
});
export type Supporter = z.infer<typeof Supporter>;

export const supporters = {
  liKa: {
    id: "liKa",
    name: "ライカワークラウンジ",
    short_name: "ライカワークラウンジ",
    url: "https://lit.link/5thfloor/",
  },
  pepabo: {
    id: "pepabo",
    name: "GMOペパボ株式会社",
    short_name: "GMOペパボ",
    url: "https://pepabo.com/",
  },
  genbasupport: {
    id: "genbasupport",
    name: "株式会社現場サポート",
    short_name: "現場サポート",
    url: "https://www.genbasupport.com/",
  },
  haruNi: {
    id: "haruNi",
    name: "アプリファクトリー はるni株式会社",
    short_name: "アプリファクトリー はるni",
    url: "https://haru-ni.net/",
  },
  hittobe: {
    id: "hittobe",
    name: "HITTOBE powered by The Company",
    short_name: "HITTOBE",
    url: "https://hittobe.jp/",
  },
  kccs: {
    id: "kccs",
    name: "京セラコミュニケーションシステム株式会社",
    short_name: "KCCS",
    url: "https://www.kccs.co.jp/",
  },
  hhgExe: {
    id: "hhgExe",
    name: "ヘッジホッグ.exe合同会社",
    short_name: "ヘッジホッグ.exe",
    url: "https://hhg-exe.jp/",
  },
  unimal: {
    id: "unimal",
    name: "株式会社ユニマル unimal Co.,Ltd.",
    short_name: "unimal",
    url: "https://unimal.jp/",
  },
};
