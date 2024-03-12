import { Layout } from "@/components/layout";
import { EventList } from "./event-list";

export const App = () => {
  return (
    <Layout>
      <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-4">
        <h2 className="font-black text-5xl text-primary">Engineer Bar</h2>
        <p>
          <span className="mr-1 bg-primary px-1 font-bold text-primary-foreground">
            エンジニア
          </span>
          をキーワードに
          <br />
          ゆるく集まるコミュニティ
        </p>
      </div>

      <EventList />
    </Layout>
  );
};
