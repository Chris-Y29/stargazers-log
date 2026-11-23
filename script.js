async function loadStarredRepositories() {
  const container = document.querySelector("#events");

  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Unable to load repositories (${response.status})`);
    }

    const repositories = await response.json();
    container.replaceChildren();

    for (const repository of repositories) {
      const card = document.createElement("article");
      card.className = "repository-card";

      const heading = document.createElement("h3");
      const link = document.createElement("a");
      link.href = repository.url;
      link.textContent = repository.name;
      link.rel = "noopener noreferrer";
      heading.append(link);

      const description = document.createElement("p");
      description.textContent = repository.description;

      const starredAt = document.createElement("time");
      starredAt.dateTime = repository.starredAt;
      starredAt.textContent = `Starred ${new Date(`${repository.starredAt}T00:00:00`).toLocaleDateString()}`;

      card.append(heading, description, starredAt);
      container.append(card);
    }
  } catch (error) {
    container.replaceChildren();
    const message = document.createElement("p");
    message.className = "error";
    message.textContent = "Could not load starred repositories.";
    container.append(message);
    console.error(error);
  }
}

loadStarredRepositories();
