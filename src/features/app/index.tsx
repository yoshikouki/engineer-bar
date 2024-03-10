import { Layout } from "@/components/layout";
import { EventList } from "./event-list";

export const App = () => {
  return (
    <Layout>
      <div className="min-h-svh flex flex-col justify-center items-center p-4 gap-4">
        <h2 className="font-black text-5xl text-primary">Engineer Bar</h2>
        <p>
          <span className="font-bold bg-primary text-primary-foreground px-1 mr-1">
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
