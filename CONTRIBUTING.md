# 🤝 Guia de Contribuição - Agendador Zap

Obrigado por considerar contribuir com o Agendador Zap! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Posso Contribuir?](#como-posso-contribuir)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Commits e Pull Requests](#commits-e-pull-requests)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Melhorias](#sugerir-melhorias)

## 📜 Código de Conduta

Este projeto adere ao [Código de Conduta](CODE_OF_CONDUCT.md). Ao participar, você concorda em manter um ambiente respeitoso e acolhedor.

## 🎯 Como Posso Contribuir?

### 1. Reportar Bugs

Encontrou um bug? Ajude-nos a melhorar!

- Verifique se o bug já não foi reportado nas [Issues](https://github.com/seu-usuario/agendador-zap/issues)
- Se não encontrar, [crie uma nova issue](https://github.com/seu-usuario/agendador-zap/issues/new?template=bug_report.md)
- Use o template de bug report
- Forneça o máximo de detalhes possível

### 2. Sugerir Melhorias

Tem uma ideia para melhorar o app?

- Verifique se a sugestão já não existe nas [Issues](https://github.com/seu-usuario/agendador-zap/issues)
- [Crie uma nova issue](https://github.com/seu-usuario/agendador-zap/issues/new?template=feature_request.md)
- Use o template de feature request
- Descreva claramente a melhoria proposta

### 3. Contribuir com Código

Quer implementar uma funcionalidade ou corrigir um bug?

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Faça suas alterações
4. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
5. Push para a branch (`git push origin feature/MinhaFeature`)
6. Abra um Pull Request

### 4. Melhorar Documentação

Documentação nunca é demais!

- Corrija erros de digitação
- Melhore explicações
- Adicione exemplos
- Traduza documentação

### 5. Revisar Pull Requests

Ajude revisando PRs de outros contribuidores:

- Teste as mudanças localmente
- Verifique se o código segue os padrões
- Forneça feedback construtivo
- Aprove se tudo estiver OK

## 🔄 Processo de Desenvolvimento

### Configuração do Ambiente

1. **Fork e Clone**
```bash
git clone https://github.com/seu-usuario/agendador-zap.git
cd agendador-zap
```

2. **Instalar Dependências**
```bash
npm install
```

3. **Configurar Ambiente**
- Siga o [SETUP.md](SETUP.md) para configurar o ambiente
- Configure o Android Studio
- Configure as variáveis de ambiente

4. **Criar Branch**
```bash
git checkout -b feature/minha-feature
# ou
git checkout -b fix/meu-bug
```

### Tipos de Branches

- `feature/*` - Novas funcionalidades
- `fix/*` - Correções de bugs
- `docs/*` - Melhorias na documentação
- `refactor/*` - Refatoração de código
- `test/*` - Adição ou correção de testes
- `chore/*` - Tarefas de manutenção

### Workflow de Desenvolvimento

1. **Desenvolva**
   - Escreva código limpo e legível
   - Siga os padrões do projeto
   - Adicione comentários quando necessário

2. **Teste**
   - Execute os testes existentes: `npm test`
   - Adicione novos testes para suas mudanças
   - Teste manualmente no emulador/dispositivo

3. **Commit**
   - Use commits atômicos (uma mudança por commit)
   - Siga o padrão de commits (veja abaixo)

4. **Push e PR**
   - Push para seu fork
   - Abra um Pull Request
   - Preencha o template de PR

## 📝 Padrões de Código

### TypeScript

- Use TypeScript para todo código novo
- Defina tipos explícitos
- Evite `any` sempre que possível
- Use interfaces para objetos complexos

```typescript
// ✅ Bom
interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = (id: string): User => {
  // ...
}

// ❌ Ruim
const getUser = (id: any): any => {
  // ...
}
```

### Nomenclatura

- **Componentes**: PascalCase (`MessageItem.tsx`)
- **Funções**: camelCase (`getUserData`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_RETRIES`)
- **Arquivos**: camelCase para services, PascalCase para componentes

### Estrutura de Componentes

```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface MyComponentProps {
  title: string;
  onPress: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onPress }) => {
  // Hooks
  const [state, setState] = React.useState('');

  // Handlers
  const handlePress = () => {
    onPress();
  };

  // Render
  return (
    <View style={styles.container}>
      {/* JSX */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

### ESLint e Prettier

- Execute `npm run lint` antes de commitar
- Configure seu editor para formatar automaticamente
- Não desabilite regras sem justificativa

### Testes

- Escreva testes para novas funcionalidades
- Mantenha coverage acima de 80%
- Use nomes descritivos para testes

```typescript
describe('MessageService', () => {
  it('should format phone number correctly', () => {
    const result = formatPhone('11999999999');
    expect(result).toBe('5511999999999');
  });

  it('should throw error for invalid phone', () => {
    expect(() => formatPhone('invalid')).toThrow();
  });
});
```

## 💬 Commits e Pull Requests

### Padrão de Commits (Conventional Commits)

Use o formato: `tipo(escopo): descrição`

**Tipos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (não afeta código)
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Manutenção

**Exemplos:**
```bash
feat(contacts): add search functionality
fix(notification): resolve scheduling bug on Android 12
docs(readme): update installation instructions
test(services): add unit tests for whatsapp service
refactor(components): simplify MessageItem logic
```

### Template de Pull Request

Ao abrir um PR, preencha:

```markdown
## Descrição
Breve descrição das mudanças

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Como Testar
1. Passo 1
2. Passo 2
3. Resultado esperado

## Checklist
- [ ] Código segue os padrões do projeto
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Sem warnings do TypeScript
- [ ] Testado em dispositivo/emulador
```

## 🐛 Reportar Bugs

### Antes de Reportar

- Atualize para a versão mais recente
- Verifique se já não foi reportado
- Tente reproduzir o bug

### Informações Necessárias

- **Versão do app**: 1.0.0
- **Versão do Android**: 11, 12, 13, etc.
- **Dispositivo**: Modelo e fabricante
- **Passos para reproduzir**: Detalhados
- **Comportamento esperado**: O que deveria acontecer
- **Comportamento atual**: O que está acontecendo
- **Screenshots**: Se aplicável
- **Logs**: Erros do console

## 💡 Sugerir Melhorias

### Template de Feature Request

```markdown
## Problema
Descreva o problema que a feature resolve

## Solução Proposta
Como você imagina a solução?

## Alternativas
Outras formas de resolver o problema

## Contexto Adicional
Screenshots, mockups, exemplos
```

## 🎨 Diretrizes de UI/UX

- Siga o Material Design
- Mantenha consistência visual
- Teste em diferentes tamanhos de tela
- Considere acessibilidade
- Use cores do tema do app

## 🔒 Segurança

- Nunca commite senhas, tokens ou chaves
- Use variáveis de ambiente para dados sensíveis
- Reporte vulnerabilidades de forma privada
- Veja [SECURITY.md](SECURITY.md) para mais detalhes

## 📚 Recursos Úteis

- [React Native Docs](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Navigation](https://reactnavigation.org/)
- [Material Design](https://material.io/design)

## ❓ Dúvidas?

- Abra uma [Discussion](https://github.com/seu-usuario/agendador-zap/discussions)
- Entre em contato via [Issues](https://github.com/seu-usuario/agendador-zap/issues)

## 🙏 Agradecimentos

Obrigado por contribuir! Cada contribuição, por menor que seja, é valiosa para o projeto.

---

**Lembre-se**: Código de qualidade é mais importante que código rápido. Tome seu tempo para fazer bem feito! 🚀