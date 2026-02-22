const Greetings = (): string => {
    const hour = new Date().getHours();

    if (hour < 10) return "Good Morning";
    if (hour < 15) return "Good Afternoon";
    if (hour < 18) return "Good Evening";
    return "Good Night";
}

export default Greetings;