local on_attach = require("plugins.configs.lspconfig").on_attach
local capabilities = require("plugins.configs.lspconfig").capabilities

local lspconfig = require "lspconfig"

-- Daftarkan server yang sudah kamu install di Mason tadi
-- ts_ls adalah untuk React/JS, tailwindcss untuk styling
local servers = { "html", "cssls", "ts_ls", "tailwindcss", "eslint" }

for _, lsp in ipairs(servers) do
  lspconfig[lsp].setup {
    on_attach = on_attach,
    capabilities = capabilities,
  }
end
