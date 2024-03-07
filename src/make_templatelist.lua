-- Creating a template format file
--
-- @arg 1 {string} PPc temporary directory path
-- @arg 2 {string} ppm-cache directory path

if #arg < 2 then
  return os.exit()
end

local COMMENT_SYMBOL = ";#="
local comp_path = arg[1]
local cache_dir = arg[2]
local candidate = {}
local comment, ext

for entry in lfs.dir(cache_dir) do
  if string.find(entry, "^_.+") then
    local i = 1
    io.input(string.format('%s\\%s', cache_dir, entry))
    repeat
      local line = io.read()
      if line and string.find(line, COMMENT_SYMBOL) then
        comment = string.gsub(line, ".*" .. COMMENT_SYMBOL .. "(.+)", " ;%1")
        ext = string.gsub(entry, "^(_%w+)%.(%w+)", "%1 ext=%2")
        table.insert(candidate, ext .. " line=" .. i .. comment)
        break
      end
      i = i + 1
    until line == nil
    io.close()
  end
end

io.output(comp_path)
io.write(table.concat(candidate, "\n"))
io.close()
