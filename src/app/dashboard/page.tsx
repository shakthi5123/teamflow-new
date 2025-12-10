"use client";

export default function DashboardPage() {
  const cards = [
    { title: "Total Boards", value: 4 },
    { title: "Task Completed", value: 28 },
    { title: "Team Members", value: 6 },
    { title: "Active Overview", value: "View" },
    
  ];

  return (
    <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="p-5 rounded-lg shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h2 className="text-gray-600 dark:text-gray-300 text-sm font-medium">
            {card.title}
          </h2>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-gray-100">
            {card.value}
          </p>
        </div>
      ))}
    </main>
  )
}