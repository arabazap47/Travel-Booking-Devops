import Header from "../components/Header";

export default function AdminDashboard() {
  return (
    <>
      <Header />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Verify and manage hotels here.
        </p>
      </div>
    </>
  );
}
