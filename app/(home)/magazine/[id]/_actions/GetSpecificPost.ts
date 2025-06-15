"use server"

import { API_BASE_URL } from "@/constants/apiEndPoints";
import { API_ENDPOINTS } from "@/constants/apiEndPoints";
import { verifySession } from "@/dal";

 export async function GetSpecificPost(id:string){
  const session = await verifySession()
        let {token} = session
        if (!session) return null
    
    if (token.startsWith('"') && token.endsWith('"')) token = token.substring(1, token.length - 1);
    if (token.startsWith('Bearer ')) token = token.substring(7);
    const authHeader = `Bearer ${token}`;
    
    const url = `${API_BASE_URL}${API_ENDPOINTS.GET_SPECIFIC_POST}${id}`;

  const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
      },
      cache:'no-store',
       
    });
    
    const data = await res.json();

    return data;
 }