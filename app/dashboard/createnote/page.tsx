export default function CreateNote() {
  return (
    <div className="max-w-xl mx-auto w-full p-6 border-zinc-800 border rounded-lg">
      <h1 className="text-white text-2xl text-center mb-10">
        Create New Note:
      </h1>
      <form>
        <input
          className="bg-white text-black p-3 rounded-sm w-full placeholder:text-zinc-900 mb-5"
          name="title"
          type="text"
          placeholder="Title..."
        ></input>
        <textarea
          className="bg-white text-black p-3 rounded-sm w-full placeholder:text-zinc-900 min-h-50 mb-10"
          name="description"
          placeholder="Write your note here..."
        ></textarea>
        <div className="flex justify-center">
          <button
            className="border border-zinc-800 px-8 py-2 cursor-pointer hover:border-zinc-700 text-white text-xl rounded-md bg-zinc-900"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
