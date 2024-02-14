import { useState } from 'react'

import { InputData } from '../input'

export const useForm = <T>(form: T) => {
  const [formState, setFormState] = useState(form)

  const handleOnChange = (data: InputData) =>
    setFormState({
      ...form,
      [data.name]: {
        value: data.value,
        error: data.error,
      },
    })

  const handleValidateForm = () => {
    let newData = {}

    const errors = Object.keys(form).map(key => {
      if (!form[key].value.length) {
        newData = {
          ...newData,
          [key]: {
            value: form[key].value,
            error: `Empty ${key}`,
          },
        }

        return true
      }

      newData = {
        ...newData,
        ...form[key],
      }

      return false
    })

    if (errors.find(e => e)) {
      return false
    }

    return true
  }

  return {
    formState,
    handleOnChange,
    handleValidateForm,
  }
}
