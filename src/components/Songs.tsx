import { useState } from "react";
import { useForm } from "react-hook-form"
import { Button, FormLabel, Input } from "@chakra-ui/react"

export const Songs = () => {
    const [value, setValue] = useState<FormValues[]>([]);

    const array = {
        songs: [{
            title: 'Pierwsza',
            author: 'Autor1'
        },
        {
            title: 'Druga',
            author: 'Autor2'
        },
        {
            title: 'Trzecia',
            author: 'Autor3'
        },
        ]
    }

    interface FormValues {
        title: string;
        author: string;
    }

    const handleData = (title:string, author:string) => {
        setValue(prev=>[...prev, {title, author}]);
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<FormValues>({
        defaultValues: {
          title: "",
          author: ""
        },
        // resolver: yupResolver(schemaAddList),
        mode: "onBlur"
      });
    //   const { fields, append, remove } = useFieldArray({
    //     name: "products",
    //     control
    //   });
      const onSubmit = (data: FormValues) => {
        handleData(data.title, data.author)
      };
      // eslint-disable-next-line no-console
      console.log(value ? array.songs.concat(value) : '');
      
    return (
        <>
            <div>
                {value ? array.songs.concat(value).map((el,i)=>(
                    <>
                        <div>Autor {i}: {el.author}</div>
                        <div>Tytuł {i}: {el.title}</div>
                    </>
                )) : ''}
            </div>

        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
                <FormLabel display="flex" justifyContent="center">Nazwa listy</FormLabel>
                <Input {...register("title")} type="text" placeholder="Nazwa piosenki" htmlSize={20} width='auto' />
                <Input {...register("author")} type="text" placeholder="Autor" htmlSize={20} width='auto' />
        </div>
        <Button colorScheme='blue' type="submit">Dodaj</Button>
      </form>
        </>
    )
}