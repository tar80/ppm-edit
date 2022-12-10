--[[
Create template format file

@arg {string} 1 PPc temporary directory path
@arg {string} 2 ppm-cache directory path
------------------------------------------------------------------------------]]

if #arg < 2 then
  return os.exit()
end

local comp_path = arg[1]
local cache_dir = arg[2]
local candidate = {}

for entry in lfs.dir(cache_dir) do
  if string.find(entry, "^_.+") then
    local i = 1
    io.input(cache_dir .. "\\" .. entry)
    repeat
      local line = io.read()
      if line and string.find(line, ";#=") then
        local comment = string.gsub(line, ".*;#=(.+)", " ;%1")
        local ext = string.gsub(entry, "^(_%w+)%.(%w+)", "%1 ext=%2")
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
