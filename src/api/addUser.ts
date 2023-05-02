import { SignupData } from "../components/validations/validation";
import { supabase } from "../supabaseClient";

export const addUser = async (values:SignupData) => {
        const {email,password,name,age,city}=values;

        const { data, error } = await supabase.auth.signUp({ 
          email: email,
          password: password
        })
        if (error) throw error;
        if (data && data.user) {
          const { data:userData, error } = await supabase
          .from('users')
          .insert([
            { id: data.user?.id, name, email, age, city }
          ])
          if (error != null) {
            alert("User already exist! Use different email");
            throw error;
          }
          if (userData === null) {
            alert(`Client ${values.email} registered!`)
          }
        }
      }