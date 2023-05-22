Set WshShell = WScript.CreateObject("WScript.Shell")

For i = 0 To 5
  WshShell.AppActivate "- Figma"
  WshShell.SendKeys "^%p"
Next
