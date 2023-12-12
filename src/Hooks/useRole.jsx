import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Components/AuthProvider";
import useAxios from "./useAxios";

const useRole = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const {
    data: role,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "role"],
    queryFn: async () => {
      const responce = await axiosInstance.get(`/get-role?email=${user.email}`);
      return responce.data;
    },
    enabled: user?.email ? true : false,
  });
  return { role, isLoading, refetch };
};

export default useRole;
