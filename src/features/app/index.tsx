import { EventList } from "./event-list";

export const App = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="min-h-svh flex flex-col justify-center items-center p-4 gap-4">
        <h2 className="font-black text-5xl">Engineer Bar</h2>
        <p className="text-muted-foreground">
          <span className="font-bold bg-primary text-primary-foreground px-1 mr-1">
            エンジニア
          </span>
          をキーワードに
          <br />
          ゆるく集まるコミュニティ
        </p>
      </div>

      <EventList />
    </div>
  );
};
