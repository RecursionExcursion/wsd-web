export default function NoConnectionToBackendNotice() {
  return (
    <div
      className="h-full w-full flex
     justify-center items-center
     text-red-500 font-semibold text-3xl"
    >
      <span>{"Unable to connect with Backend :("}</span>
    </div>
  );
}
