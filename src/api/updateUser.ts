import { SignupData } from "../components/validations/validation";
import { useUserContext } from "../contexts/UserContext";
import { supabase } from "../supabaseClient";

export const updateUser = async (values:SignupData, initialEmail:string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {id}=useUserContext();
    const { data, error } = await supabase.auth.updateUser({ email: initialEmail, password: values.password });
    if (error) throw error;
    if (data) {
        const { data:userData, error:errorData } = await supabase
        .from('users')
        .update({
            name: values.name,
            age: values.age,
            email: values.email,
            city: values.city
        })
        .eq('id', id)
        if (errorData) throw errorData;
        return userData;
    }
  }