import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import type { LoaderData } from "./types";

export default function App() {
  const navigate = useNavigate();
  const params = useParams();

  const {
    provinces,
    regencies,
    districts,
    selectedProvince,
    selectedRegency,
    selectedDistrict,
  } = useLoaderData() as LoaderData;

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) return navigate("/");
    navigate(`/${value}`);
  };

  const handleRegencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) return navigate(`/${params.provinceId}`);
    navigate(`/${params.provinceId}/${value}`);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    navigate(`/${params.provinceId}/${params.regencyId}/${value}`);
  };

  const handleReset = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-[#f9fbfd] text-slate-800">
      {/* Sidebar */}
      <aside className="w-[320px] bg-[#f9fbfd] border-r border-slate-200 p-8">
        <div className="space-y-6">
          <p className="text-xs tracking-widest text-slate-400 uppercase">
            Filter Wilayah
          </p>

          {/* Province */}
          <div className="space-y-2">
            <label className="text-xs uppercase text-slate-500 tracking-wider">
              Provinsi
            </label>
            <select
              name="province"
              value={params.provinceId ?? ""}
              onChange={handleProvinceChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Provinsi</option>
              {provinces.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Regency */}
          <div className="space-y-2">
            <label className="text-xs uppercase text-slate-500 tracking-wider">
              Kota / Kabupaten
            </label>
            <select
              name="regency"
              value={params.regencyId ?? ""}
              onChange={handleRegencyChange}
              disabled={!params.provinceId}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm disabled:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Kota/Kabupaten</option>
              {regencies.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div className="space-y-2">
            <label className="text-xs uppercase text-slate-500 tracking-wider">
              Kecamatan
            </label>
            <select
              name="district"
              value={params.districtId ?? ""}
              onChange={handleDistrictChange}
              disabled={!params.regencyId}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm disabled:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Kecamatan</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="w-full rounded-xl border border-blue-500 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition"
          >
            Reset
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#f9fbfd]">
        {/* Breadcrumb (fixed at top) */}
        <nav className="breadcrumb bg-[#fefefe] px-10 py-4 shadow-sm text-sm text-slate-400">
          Indonesia
          {selectedProvince && (
            <>
              <span className="mx-2">›</span>
              {selectedProvince.name}
            </>
          )}
          {selectedRegency && (
            <>
              <span className="mx-2">›</span>
              {selectedRegency.name}
            </>
          )}
          {selectedDistrict && (
            <>
              <span className="mx-2">›</span>
              {selectedDistrict.name}
            </>
          )}
        </nav>

        {/* Center Content Area */}
        <div className="flex-1 flex items-center justify-center px-12">
          <main className="text-center space-y-10">
            {selectedProvince && (
              <div>
                <p className="text-xs uppercase tracking-widest text-blue-500 mb-3">
                  Provinsi
                </p>
                <h1 className="text-6xl font-bold tracking-tight">
                  {selectedProvince.name}
                </h1>
              </div>
            )}

            {selectedRegency && (
              <div>
                <p className="text-xs uppercase tracking-widest text-blue-500 mb-3">
                  Kota / Kabupaten
                </p>
                <h2 className="text-5xl font-semibold tracking-tight">
                  {selectedRegency.name}
                </h2>
              </div>
            )}

            {selectedDistrict && (
              <div>
                <p className="text-xs uppercase tracking-widest text-blue-500 mb-3">
                  Kecamatan
                </p>
                <h3 className="text-4xl font-medium tracking-tight">
                  {selectedDistrict.name}
                </h3>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
