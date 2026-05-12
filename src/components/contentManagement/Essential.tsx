import ActionButton from "@/common/button/ActionButton";
import CommonButton from "@/common/button/CommonButton";
import DashboardCardSkeleton from "@/common/button/DashboardCardSkeleton";
import SectionHeader from "@/common/button/SectionHeader";
import Pagination from "@/common/custom/Pagination";
import TabButton from "@/common/custom/TabButton";
import { useDebounce } from "@/common/custom/useDebounce";
import CommonHeader from "@/common/header/CommonHeader";
import {
  useDeleteHealthMarkerMutation,
  useDeletePartnerMutation,
  useDeleteSupplementMutation,
  useGetHealthMarkersQuery,
  useGetPartnerQuery,
  useGetSupplementQuery,
} from "@/store/features/content/essentialManagement";
import type {
  PartnerClinic,
  SupplementProduct,
} from "@/store/features/content/types/essential";
import type { HealthMarkerItem } from "@/store/features/content/types/healthCare";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { tableDesign } from "../programManagement/ProgramAnalytics";
import UserSearchBar from "../userManagement/UserSearchBar";
import EssentialCard from "./EssentialCard";
import AddPartnerClinicModal from "./modal/AddPartnerClinicModal";
import AddSupplementProductModal from "./modal/AddSupplementProductModal";
import HealthMarkerModal from "./modal/HealthMarkerModal";
export type EssentialType = "health" | "supplements";
const tableHeaders = [
  { label: "Clinic Name", align: "text-left" },
  { label: "Location", align: "text-left hidden sm:table-cell" },
  { label: "Time", align: "text-left hidden xl:table-cell" },
  { label: "Phone", align: "text-left hidden md:table-cell" },
  { label: "Trend", align: "text-left" },
];

const Essential = () => {
  const { data, isLoading } = useGetPartnerQuery();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const searchDebounce = useDebounce(search, 500);
  const { data: supplementData, isLoading: supplementLoading } =
    useGetSupplementQuery({
      search: searchDebounce,
      category,
      page,
      limit: 3,
    });
  const partnerClinics = data?.data?.data || [];
  const supplement = supplementData?.data?.data?.data || [];
  const list = new Array(5).fill(null);
  const [deleteSupplement] = useDeleteSupplementMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const handleDeleteForSupplement = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteSupplement(id).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };
  const [activeEssentialType, setActiveEssentialType] =
    useState<EssentialType>("health");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectSupplement, setSelectSupplement] =
    useState<SupplementProduct | null>(null);
  const [selectPartner, setSelectPartner] = useState<PartnerClinic | null>(
    null,
  );
  const [deletePartner] = useDeletePartnerMutation();
  const handleDeleteForHealth = async (id: string) => {
    try {
      setDeletingId(id);
      await deletePartner(id).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };
  const [showHealthMarkerModalModal, setShowHealthMarkerModalModal] =
    useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: healthMarker, isLoading: healthMarkerLoading } =
    useGetHealthMarkersQuery({
      page: currentPage,
    });
  const healthMarkersData = healthMarker?.data?.data.data ?? [];

  const [selectedHealthMarker, setSelectedHealthMarker] =
    useState<HealthMarkerItem | null>(null);

  const [deleteHealthMarker] = useDeleteHealthMarkerMutation();
  const handleDeleteHealthMarker = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteHealthMarker(id).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <CommonHeader size="lg" className="mb-4">
        Health & Essentials Management
      </CommonHeader>

      <div className="flex flex-wrap gap-3 mb-6">
        <TabButton
          label="Health Checks & Clinics"
          value="health"
          activeValue={activeEssentialType}
          onChange={setActiveEssentialType}
        />
        <TabButton
          label="Supplement"
          value="supplements"
          activeValue={activeEssentialType}
          onChange={setActiveEssentialType}
        />
      </div>
      {activeEssentialType === "health" && (
        <>
          <div className="mb-8 rounded-2xl bg-white text-black p-6">
            <div className="flex flex-col sm:flex-row justify-between items-stretch  sm:items-baseline-last  mb-4 ">
              <div>
                <SectionHeader
                  title="Health Markers"
                  description="Manage drug/clinic fields and health indicators"
                />
              </div>
              <CommonButton
                onClick={() => {
                  setShowHealthMarkerModalModal(true);
                  setSelectedHealthMarker(null);
                }}
              >
                <Plus size={20} />
                Add Content
              </CommonButton>
            </div>

            {healthMarkerLoading ? (
              list.map((_, index) => <DashboardCardSkeleton key={index} />)
            ) : healthMarkersData.length > 0 ? (
              <div className="space-y-3">
                {healthMarkersData.map((marker) => (
                  <EssentialCard
                    name={marker.title}
                    list={marker.items}
                    onEdit={() => {
                      setSelectedHealthMarker(marker as HealthMarkerItem);
                      setShowHealthMarkerModalModal(true);
                    }}
                    onDelete={() => handleDeleteHealthMarker(marker.id)}
                    isLoading={deletingId === marker.id}
                  />
                ))}
                <div className="pt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={healthMarker?.data.data.meta.totalPages || 1}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            ) : (
              <p className="text-center py-2">No health markers found</p>
            )}
          </div>

          {isLoading ? (
            <DashboardCardSkeleton />
          ) : partnerClinics.length > 0 ? (
            <div className=" bg-white p-6 rounded-lg ">
              <div className="flex flex-col sm:flex-row justify-between items-stretch  sm:items-baseline-last  mb-4">
                <div className="">
                  <SectionHeader
                    title="Partner Clinics Directory"
                    description="Manage medical providers and diagnostic centers"
                    className=""
                  />
                </div>

                <CommonButton
                  onClick={() => {
                    setShowAddModal(true);
                    setSelectPartner(null);
                  }}
                >
                  <Plus size={20} />
                  Add Clinic
                </CommonButton>
              </div>

              <div className="bg-white rounded-lg   overflow-hidden">
                <div className=" w-full overflow-x-auto">
                  <table className={tableDesign.table}>
                    <thead className={tableDesign.thead}>
                      <tr className={tableDesign.tr}>
                        {tableHeaders.map((header, index) => (
                          <th
                            key={index}
                            className={` ${header.align} ${tableDesign.th} ${index === 0 || index === 1 ? "text-left!" : ""} `}
                          >
                            {header.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className={tableDesign.tbody}>
                      {partnerClinics.map((clinic) => (
                        <tr key={clinic.id} className={tableDesign.tr}>
                          <td className={`text-left! ${tableDesign.td}`}>
                            {clinic.name}
                          </td>
                          <td
                            className={`hidden sm:table-cell text-left! ${tableDesign.td} `}
                          >
                            {clinic.address}
                          </td>
                          <td
                            className={`hidden xl:table-cell  ${tableDesign.td}`}
                          >
                            {clinic.closeTime}
                          </td>
                          <td
                            className={`hidden md:table-cell ${tableDesign.td}`}
                          >
                            {clinic.phone}
                          </td>
                          <td className={` ${tableDesign.td}`}>
                            <div className="flex items-center justify-center gap-2">
                              <ActionButton
                                variant="edit"
                                editClassName="!bg-white !text-darkPurple border border-darkPurple"
                                onClick={() => {
                                  setShowAddModal(true);
                                  setSelectPartner(clinic);
                                }}
                              >
                                <Edit2 size={16} />
                              </ActionButton>
                              <ActionButton
                                variant="delete"
                                onClick={() => handleDeleteForHealth(clinic.id)}
                                isDelete={deletingId === clinic.id}
                              >
                                <Trash2 size={16} />
                              </ActionButton>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <p>No clinics found</p>
          )}
        </>
      )}
      {activeEssentialType === "supplements" && (
        <>
          <UserSearchBar
            placeholder="Search orders..."
            searchValue={search}
            onSearchChange={(e) => setSearch(e.target.value)}
            selectValue={category}
            onSelectChange={setCategory}
            selectItems={[
              { label: "Foundation", value: "FOUNDATION" },
              { label: "Performance", value: "PERFORMANCE" },
              { label: "Recovery", value: "RECOVERY" },
              { label: "Optional", value: "OPTIONAL" },
            ]}
          />

          <div>
            {supplementLoading ? (
              list.map((_, index) => <DashboardCardSkeleton key={index} />)
            ) : supplement.length > 0 ? (
              <div className="flex flex-col sm:flex-row justify-between  items-stretch  sm:items-center my-4">
                <div>
                  <SectionHeader
                    title="Supplement Products"
                    description="Manage product catalog, pricing, and availability"
                  />
                </div>
                <CommonButton
                  onClick={() => {
                    setShowAddModal(true);
                    setSelectSupplement(null);
                  }}
                >
                  <Plus size={20} />
                  Add Product
                </CommonButton>
              </div>
            ) : (
              <p className="text-center py-2">No products found</p>
            )}

            <div className="grid grid-cols-1  lg:grid-cols-2  xl:grid-cols-3 gap-4">
              {supplement.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg border border-gray-200 p-4"
                >
                  <div className="relative mb-4">
                    <div className=" h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="max-h-full"
                      />
                    </div>
                    <span
                      className={`absolute top-2 right-2 ${product.inStock ? "bg-[#DCFCE7] text-[#008236]" : "bg-red-100 text-red-700"}  px-2 py-1 rounded-full`}
                    >
                      {product.inStock ? "In stock" : "Out of stock"}
                    </span>
                  </div>
                  <h4 className="font-bold mb-1">{product.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Sold by: {product.vendorName}
                  </p>
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded mb-3">
                    {product.category}
                  </span>
                  <ul className="text-xs text-gray-700 space-y-1 mb-3">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span>✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">${product.price}</span>
                    <div className="flex gap-2">
                      <ActionButton
                        variant="edit"
                        editClassName=" !bg-white border border-darkPurple "
                        onClick={() => {
                          setSelectSupplement(product);
                          setShowAddModal(true);
                        }}
                      >
                        <Edit2 size={16} className="text-darkPurple" />
                      </ActionButton>
                      <ActionButton
                        variant="delete"
                        onClick={() => handleDeleteForSupplement(product.id)}
                        isDelete={deletingId === product.id}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </ActionButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {supplementData && supplementData?.data.data.data.length > 1 && (
            <div className="py-5">
              <Pagination
                currentPage={page}
                totalPages={supplementData?.data.data.meta.totalPages || 1}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      )}

      {showHealthMarkerModalModal && activeEssentialType === "health" && (
        <HealthMarkerModal
          onClose={() => setShowHealthMarkerModalModal(false)}
          isOpen={showHealthMarkerModalModal}
          selectedHealthMarker={selectedHealthMarker as HealthMarkerItem | null}
        />
      )}
      {showAddModal && activeEssentialType === "health" && (
        <AddPartnerClinicModal
          onClose={() => setShowAddModal(false)}
          selectPartner={selectPartner}
        />
      )}
      {showAddModal && activeEssentialType === "supplements" && (
        <AddSupplementProductModal
          onClose={() => setShowAddModal(false)}
          selectSupplement={selectSupplement}
        />
      )}
    </div>
  );
};

export default Essential;
