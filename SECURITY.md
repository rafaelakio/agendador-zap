# 🔒 Política de Segurança

## Versões Suportadas

Atualmente, as seguintes versões do Agendador Zap recebem atualizações de segurança:

| Versão | Suportada          |
| ------ | ------------------ |
| 1.0.x  | :white_check_mark: |
| < 1.0  | :x:                |

## 🐛 Reportar uma Vulnerabilidade

A segurança dos nossos usuários é nossa prioridade máxima. Se você descobriu uma vulnerabilidade de segurança, pedimos que nos ajude a proteger nossos usuários seguindo estas diretrizes:

### ⚠️ NÃO Faça

- **NÃO** abra uma issue pública sobre a vulnerabilidade
- **NÃO** divulgue a vulnerabilidade publicamente antes de ser corrigida
- **NÃO** explore a vulnerabilidade além do necessário para demonstrá-la

### ✅ Faça

1. **Reporte Privadamente**
   - Envie um e-mail para: [security@agendadorzap.com] (substitua pelo e-mail real)
   - Ou use o recurso de [Security Advisories](https://github.com/seu-usuario/agendador-zap/security/advisories/new) do GitHub

2. **Forneça Detalhes**
   - Descrição clara da vulnerabilidade
   - Passos para reproduzir
   - Impacto potencial
   - Versão afetada
   - Sugestões de correção (se houver)

3. **Aguarde Resposta**
   - Responderemos em até 48 horas
   - Trabalharemos com você para entender e corrigir o problema
   - Manteremos você informado sobre o progresso

### 📋 Template de Reporte

```markdown
**Tipo de Vulnerabilidade:**
[Ex: XSS, SQL Injection, Exposição de Dados, etc.]

**Versão Afetada:**
[Ex: 1.0.0]

**Descrição:**
[Descrição detalhada da vulnerabilidade]

**Passos para Reproduzir:**
1. [Primeiro passo]
2. [Segundo passo]
3. [...]

**Impacto:**
[Qual o impacto potencial desta vulnerabilidade?]

**Prova de Conceito:**
[Código, screenshots, ou vídeo demonstrando a vulnerabilidade]

**Sugestões de Correção:**
[Se você tiver sugestões de como corrigir]

**Informações Adicionais:**
[Qualquer outra informação relevante]
```

## 🔐 Processo de Resposta

### 1. Confirmação (0-48 horas)
- Confirmaremos o recebimento do seu reporte
- Avaliaremos a severidade da vulnerabilidade

### 2. Investigação (2-7 dias)
- Investigaremos e reproduziremos a vulnerabilidade
- Desenvolveremos uma correção
- Testaremos a correção

### 3. Correção (7-14 dias)
- Implementaremos a correção
- Prepararemos um patch de segurança
- Testaremos em diferentes cenários

### 4. Divulgação (14-30 dias)
- Lançaremos a versão corrigida
- Publicaremos um security advisory
- Creditaremos você (se desejar)

## 🏆 Reconhecimento

Agradecemos aos seguintes pesquisadores de segurança por reportarem vulnerabilidades de forma responsável:

<!-- Lista será atualizada conforme reportes -->
- Nenhum reporte até o momento

## 🛡️ Melhores Práticas de Segurança

### Para Usuários

1. **Mantenha o App Atualizado**
   - Sempre use a versão mais recente
   - Ative atualizações automáticas quando disponível

2. **Permissões**
   - Revise as permissões solicitadas
   - Conceda apenas as necessárias

3. **Dados Sensíveis**
   - Não compartilhe informações sensíveis via mensagens agendadas
   - Use senhas fortes se implementarmos autenticação

4. **Dispositivo**
   - Mantenha seu Android atualizado
   - Use bloqueio de tela
   - Não faça root sem necessidade

### Para Desenvolvedores

1. **Código**
   - Sempre valide inputs do usuário
   - Use prepared statements para queries
   - Sanitize dados antes de exibir
   - Não armazene dados sensíveis em plain text

2. **Dependências**
   - Mantenha dependências atualizadas
   - Use `npm audit` regularmente
   - Revise dependências antes de adicionar

3. **Testes**
   - Escreva testes de segurança
   - Teste edge cases
   - Faça code review de mudanças

4. **Secrets**
   - Nunca commite secrets
   - Use variáveis de ambiente
   - Use .gitignore adequadamente

## 🔍 Escopo de Segurança

### Dentro do Escopo

- Vulnerabilidades no código do aplicativo
- Problemas de autenticação/autorização
- Exposição de dados sensíveis
- Injeção de código
- Cross-site scripting (XSS)
- Problemas de criptografia
- Vulnerabilidades em dependências

### Fora do Escopo

- Vulnerabilidades em serviços de terceiros (WhatsApp, Google)
- Problemas de usabilidade
- Bugs que não afetam segurança
- Ataques de engenharia social
- Ataques físicos ao dispositivo
- Vulnerabilidades já conhecidas e reportadas

## 📚 Recursos de Segurança

### Ferramentas Recomendadas

- [OWASP Mobile Security Testing Guide](https://owasp.org/www-project-mobile-security-testing-guide/)
- [Android Security Best Practices](https://developer.android.com/topic/security/best-practices)
- [React Native Security](https://reactnative.dev/docs/security)

### Checklist de Segurança

- [ ] Validação de inputs
- [ ] Sanitização de outputs
- [ ] Criptografia de dados sensíveis
- [ ] Comunicação segura (HTTPS)
- [ ] Autenticação robusta
- [ ] Autorização adequada
- [ ] Logs sem informações sensíveis
- [ ] Tratamento seguro de erros
- [ ] Dependências atualizadas
- [ ] Code review de segurança

## 🔄 Atualizações de Segurança

Atualizações de segurança são lançadas conforme necessário. Quando uma vulnerabilidade crítica é descoberta:

1. Lançamos um patch imediatamente
2. Notificamos usuários via:
   - GitHub Security Advisories
   - Release notes
   - Notificação no app (se possível)

## 📞 Contato

Para questões de segurança:
- **E-mail**: [security@agendadorzap.com]
- **GitHub Security**: [Security Advisories](https://github.com/seu-usuario/agendador-zap/security/advisories)

Para outras questões:
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/agendador-zap/issues)
- **Discussions**: [GitHub Discussions](https://github.com/seu-usuario/agendador-zap/discussions)

## 🙏 Agradecimentos

Agradecemos a todos que contribuem para manter o Agendador Zap seguro. A divulgação responsável de vulnerabilidades ajuda a proteger todos os nossos usuários.

---

**Última atualização**: 30 de Abril de 2026  
**Versão da Política**: 1.0