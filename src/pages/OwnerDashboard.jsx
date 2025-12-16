import Header from "../components/Header";

export default function OwnerDashboard() {
  return (
    <>
      <Header />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Owner Dashboard</h1>
        <p className="text-gray-600">
          Add and manage your hotels here.
        </p>

        <button className="mt-4 px-4 py-2 bg-primary text-white rounded">
          Add Hotel
        </button>
      </div>
    </>
  );
}
