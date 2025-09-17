// // tests/form.test.tsx
// import React from 'react'
// import { render, screen, waitFor } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import { useAppStore } from '@/stores/useAppStore'
// import { UserForm } from '@/components/UserForm'

// // Mock da store
// jest.mock('@/stores/useAppStore')

// describe('Formulário de Usuário', () => {
//   const mockSetUser = jest.fn()
//   const mockNextStep = jest.fn()

//   beforeEach(() => {
//     // Reset dos mocks
//     jest.clearAllMocks()
    
//     // Mock da store
//     ;(useAppStore as unknown as jest.Mock).mockReturnValue({
//       user: {
//         name: '',
//         phone: '',
//         birthday: '',
//         email: ''
//       },
//       setUser: mockSetUser,
//       nextStep: mockNextStep
//     })
//   })

//   test('deve renderizar o formulário com campos vazios', () => {
//     render(<UserForm />)
    
//     expect(screen.getByLabelText(/nome/i)).toHaveValue('')
//     expect(screen.getByLabelText(/telefone/i)).toHaveValue('')
//     expect(screen.getByLabelText(/data de nascimento/i)).toHaveValue('')
//     expect(screen.getByLabelText(/email/i)).toHaveValue('')
//   })

//   test('deve permitir preencher o campo nome', async () => {
//     const user = userEvent.setup()
//     render(<UserForm />)
    
//     const nomeInput = screen.getByLabelText(/nome/i)
//     await user.type(nomeInput, 'João Silva')
    
//     expect(nomeInput).toHaveValue('João Silva')
//   })

//   test('deve permitir preencher o campo telefone com máscara', async () => {
//     const user = userEvent.setup()
//     render(<UserForm />)
    
//     const telefoneInput = screen.getByLabelText(/telefone/i)
//     await user.type(telefoneInput, '11999998888')
    
//     // A máscara deve ser aplicada automaticamente
//     expect(telefoneInput).toHaveValue('(11) 99999-8888')
//   })

//   test('deve permitir preencher o campo data de nascimento', async () => {
//     const user = userEvent.setup()
//     render(<UserForm />)
    
//     const dataInput = screen.getByLabelText(/data de nascimento/i)
//     await user.type(dataInput, '15081990')
    
//     // A máscara deve formatar para DD/MM/AAAA
//     expect(dataInput).toHaveValue('15/08/1990')
//   })

//   test('deve permitir preencher o campo email', async () => {
//     const user = userEvent.setup()
//     render(<UserForm />)
    
//     const emailInput = screen.getByLabelText(/email/i)
//     await user.type(emailInput, 'joao@email.com')
    
//     expect(emailInput).toHaveValue('joao@email.com')
//   })

//   test('deve enviar o formulário quando preenchido corretamente', async () => {
//     const user = userEvent.setup()
//     render(<UserForm />)
    
//     // Preenche todos os campos
//     await user.type(screen.getByLabelText(/nome/i), 'João Silva')
//     await user.type(screen.getByLabelText(/telefone/i), '11999998888')
//     await user.type(screen.getByLabelText(/data de nascimento/i), '15081990')
//     await user.type(screen.getByLabelText(/email/i), 'joao@email.com')
    
//     // Clica no botão de enviar
//     await user.click(screen.getByRole('button', { name: /enviar/i }))
    
//     // Verifica se a store foi chamada com os dados corretos
//     await waitFor(() => {
//       expect(mockSetUser).toHaveBeenCalledWith({
//         name: 'João Silva',
//         phone: '(11) 99999-8888',
//         birthday: '15/08/1990',
//         email: 'joao@email.com'
//       })
//     })
    
//     // Verifica se a navegação foi chamada
//     expect(mockNextStep).toHaveBeenCalled()
//   })

//   test('deve mostrar mensagem de erro quando campo obrigatório não for preenchido', async () => {
//     const user = userEvent.setup()
//     render(<UserForm />)
    
//     // Tenta enviar sem preencher o nome
//     await user.click(screen.getByRole('button', { name: /enviar/i }))
    
//     // Deve mostrar mensagem de erro
//     expect(await screen.findByText(/nome é obrigatório/i)).toBeInTheDocument()
    
//     // Não deve chamar a store nem navegar
//     expect(mockSetUser).not.toHaveBeenCalled()
//     expect(mockNextStep).not.toHaveBeenCalled()
//   })

//   test('deve validar formato do email', async () => {
//     const user = userEvent.setup()
//     render(<UserForm />)
    
//     // Preenche com email inválido
//     await user.type(screen.getByLabelText(/nome/i), 'João Silva')
//     await user.type(screen.getByLabelText(/telefone/i), '11999998888')
//     await user.type(screen.getByLabelText(/email/i), 'email-invalido')
    
//     await user.click(screen.getByRole('button', { name: /enviar/i }))
    
//     // Deve mostrar mensagem de erro para email
//     expect(await screen.findByText(/email inválido/i)).toBeInTheDocument()
//   })
// })