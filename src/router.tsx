import {
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import provinces from "./data/provinces.json";
import regencies from "./data/regencies.json";
import districts from "./data/districts.json";
import type { LoaderData } from "./types";

export const router = createBrowserRouter([
  {
    path: "/:provinceId?/:regencyId?/:districtId?",
    element: <App />,
    loader: async ({ params }): Promise<LoaderData> => {
      const provinceId = Number(params.provinceId);
      const regencyId = Number(params.regencyId);
      const districtId = Number(params.districtId);

      const selectedProvince = provinces.find(
        p => p.id === provinceId
      );

      const filteredRegencies = selectedProvince
        ? regencies.filter(r => r.province_id === provinceId)
        : [];

      const selectedRegency = filteredRegencies.find(
        r => r.id === regencyId
      );

      const filteredDistricts = selectedRegency
        ? districts.filter(d => d.regency_id === regencyId)
        : [];

      const selectedDistrict = filteredDistricts.find(
        d => d.id === districtId
      );

      return {
        provinces,
        regencies: filteredRegencies,
        districts: filteredDistricts,
        selectedProvince,
        selectedRegency,
        selectedDistrict,
      };
    },
  },
]);