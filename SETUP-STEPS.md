\# Setup steps



\## 1. Put files in your repo



Copy the following into the root of your project:



\- `CLAUDE.md`

\- `docs/`

\- `.claude/agents/`

\- `.claude/commands/`



\## 2. Start Claude Code in the repo



Open the repository in Claude Code CLI (hoặc Desktop nếu dùng Agent Teams).  

Đảm bảo bạn đang đứng đúng folder dự án.



\## 3. Create project agents if needed



Nếu bản Claude Code của bạn yêu cầu tạo agent ở project scope bằng `/agents`,  

hãy tạo từng agent và copy nội dung từ file tương ứng trong `.claude/agents/` vào.  

Nếu bản của bạn tự đọc files `.claude/agents/` thì có thể giữ nguyên.



\## 4. Bootstrap the project



Bắt đầu bằng một prompt:



> Create an autonomous team for this repository. Use the lead-orchestrator role. Read CLAUDE.md and the docs folder, then turn the product vision into a phased architecture and V1 execution plan. Delegate roadmap shaping to product-architect, UI planning to frontend-builder, data and auth planning to backend-builder, risk review to qa-bughunter, and future idea evaluation to feature-scout. Ask me only when a destructive or truly blocking decision appears.



\## 5. Use commands



Nếu Claude Code của bạn hỗ trợ đọc commands từ `.claude/commands/`, hãy dùng:



\- `bootstrap-project` – tạo plan V1

\- `run-autonomous-sprint` – chạy một sprint tự động cho milestone hiện tại



\## 6. Keep CLAUDE.md small



Đừng nhét mọi ý tưởng vào `CLAUDE.md`.  

Giữ phần luật chung ở đây, còn chi tiết thay đổi thường xuyên cho vào `docs/`.



\## 7. Add hooks later



Sau khi team chạy ổn, hãy thêm hooks để:



\- Chạy lint sau các edit liên quan

\- Chạy test sau khi hoàn thành task

\- Kiểm tra trước khi kết thúc sprint

\- Chặn ghi vào file nhạy cảm (`.env`, config production, v.v.)

