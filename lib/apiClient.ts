// import { API_ENDPOINTS } from '@/constants/apiEndPoints';


// export const getHeaders = async () => {
//     const token = cookies().get(auth.storageTokenKeyName)?.value as string;
//     // console.log("token" , token)
//     return {
//       Authorization: "Bearer" + " " + token,
//       userType: "admin",
//       "Content-Type": "application/json",
//     };
//   };

// export const create = async (
//     endpoint: string,
//     createBody: FormData | Record<string, any>,
//     tag?: string
//   ): Promise<any> => {
//     console.log("create", createBody);
  
//     try {
//       let body, head;
  
//       const headers = await getHeaders();
  
//       if (createBody instanceof FormData) {
//         body = createBody as FormData;
//         head = {
//           Authorization: headers.Authorization,
//           userType: headers.userType,
//         };
//       } else {
//         body = JSON.stringify(createBody);
//         head = headers;
//       }
  
//       let res = await fetch(server.host + endpoint, {
//         headers: head,
//         method: "POST",
//         body: body,
//         cache: "no-store",
//       });
  
//       const data = await res.json();
//       console.log("res", data);
  
//       if (!res.ok) {
//         throw new Error(data.message);
//       } else {
//         if (endpoint === "/expenses") {
//           console.log("revalidating expenses");
//         }
//         tag && revalidateTag(tag);
//         return {
//           statusCode: res.status,
//         };
//       }
//     } catch (err: any) {
//       return {
//         error: err?.message || "Something went wrong",
//       };
//     }
//   };

// // Usage:
// await apiClient.post(API_ENDPOINTS.SIGNUP, { email, password });