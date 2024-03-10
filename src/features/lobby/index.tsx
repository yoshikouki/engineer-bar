export const Lobby = ({ eventId }: { eventId: number }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center p-4 gap-4">
        <h2 className="font-black text-5xl text-primary">{eventId}</h2>
      </div>
    </>
  );
};
