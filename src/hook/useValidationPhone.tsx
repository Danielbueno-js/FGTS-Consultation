import { useQuery } from '@tanstack/react-query'
import { validatePhoneNumber } from '@/services/phoneNumber'

export function usePhoneValidation(phone: number) {
  return useQuery({
    queryKey: ['phone-validation', phone],
    queryFn: () => validatePhoneNumber(phone),
    enabled: false,
    retry: false,
  })
}