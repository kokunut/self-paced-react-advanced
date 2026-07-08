import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URL = "http://localhost:3000/restaurants";

export function useRestaurantsQuery(){
    return useQuery({
        queryKey: ["restaurants"],
        queryFn: () => fetch(BASE_URL).then((res) => res.json()),
    });
}

export function useAddRestaurantMutation(){
    const queryClient =useQueryClient();

    return useMutation({
        mutationFn: async (newRestaurant) => {
            const res = await fetch(BASE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newRestaurant),
            });
    
            if (!res.ok) {
                throw new Error("서버에 식당을 추가하는 데 실패했습니다.");
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["restaurants"] });
        },
        onError: (error) => {
            console.error(error);
            alert("음식점을 추가하는 중 오류가 발생했습니다. 다시 시도해 주세요.");
        },
    });
}
