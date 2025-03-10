document.addEventListener("DOMContentLoaded", () => {
    let currentPage = 1;
    const teamContainer = document.getElementById("alt-GridTeam");

    async function fetchTeamMembers(page) {
        try {
            const response = await fetch(`https://api.msp-alazhar.tech/teamMembersClient/get?page=${page}&limit=4`);
            const data = await response.json();

            if (data.results.length > 0) {
                renderTeamMembers(data.results);
            } else {
                console.log("No more team members to display.");
            }
        } catch (error) {
            console.error("Error fetching team members:", error);
        }
    }

    function renderTeamMembers(members) {
        members.forEach(member => {
            const memberCard = document.createElement("div");
            memberCard.classList.add("alt-team-member");

            memberCard.innerHTML = `
                <div class="alt-image-wrapper">
                    <img crossorigin="anonymous" src="${member.image}" alt="${member.name}">
                </div>
                <h3>${member.name}</h3>
                <p>${member.track}</p>
                <p>${member.description}</p>
                <div class="alt-social-links">
                    ${member.linkedin ? `<a href="${member.linkedin}" target="_blank">LinkedIn</a>` : ""}
                    ${member.facebook ? `<a href="${member.facebook}" target="_blank">Facebook</a>` : ""}
                    ${member.behanceOrGithub ? `<a href="${member.behanceOrGithub}" target="_blank">GitHub/Behance</a>` : ""}
                </div>
            `;
            teamContainer.appendChild(memberCard);
        });
    }

    // Load initial team members
    fetchTeamMembers(currentPage);
});
